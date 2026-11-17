#!/usr/bin/env python3
"""Sincroniza el feed JSON de SociableKIT con el historial propio del portfolio.

Primera importación: solo las tres tarjetas curadas existentes. Después solo
publicaciones cuya fecha de origen sea POSTERIOR al punto inicial. Una publicación
existente no se reescribe ni se elimina. No hacen falta dependencias externas.
"""
import argparse
from datetime import datetime
import html
import json
from pathlib import Path
import re
import urllib.request
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
POSTS_PATH = ROOT / 'public/assets/linkedin/posts.json'
STATE_PATH = ROOT / 'public/assets/linkedin/sync-state.json'
MEDIA = ROOT / 'public/assets/linkedin/media'
MAX_IMAGE_BYTES = 6 * 1024 * 1024
IMAGE_HOSTS = {'data-image.sociablekit.com', 'media.licdn.com'}


def get_feed(args):
    if args.feed_file:
        source = Path(args.feed_file).read_text(encoding='utf-8').strip()
        if source.startswith('```') and source.endswith('```'):
            source = '\n'.join(source.splitlines()[1:-1])
        return json.loads(source)
    if not args.feed_url:
        raise ValueError('Indicá --feed-file o --feed-url (SOCIABLEKIT_FEED_URL).')
    url = urlparse(args.feed_url)
    if url.scheme != 'https' or url.hostname not in {'data.accentapi.com'}:
        raise ValueError('La URL del feed debe ser HTTPS de data.accentapi.com.')
    request = urllib.request.Request(args.feed_url, headers={'User-Agent': 'PortfolioLinkedInSync/1.0'})
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)


def clean(text):
    text = re.sub(r'<br\s*/?>', '\n', text or '', flags=re.I)
    text = re.sub(r'<[^>]+>', '', text)
    text = html.unescape(text)
    return re.sub(r'\s+', ' ', text).strip()


def excerpt(text, max_chars):
    return text if len(text) <= max_chars else text[:max_chars].rsplit(' ', 1)[0].rstrip(' ,.;:') + '…'


def post_link(raw):
    for key in ('permalink', 'linkedin_url', 'post_url'):
        url = str(raw.get(key) or '')
        host = urlparse(url).hostname or ''
        if host == 'linkedin.com' or host.endswith('.linkedin.com'):
            return url
    # SociableKIT omite post_url para posts normales. Sus IDs suelen ser
    # activity IDs, pero la validez del permalink no está garantizada.
    identifier = str(raw['id'])
    return f'https://www.linkedin.com/feed/update/urn:li:activity:{identifier}/' if identifier.isdigit() else ''


def cache_image(raw, item_id):
    src = raw.get('thumbnail_sk_img') or raw.get('thumbnail_url') or raw.get('thumbnail') or ''
    if not src:
        return ''
    parsed = urlparse(src)
    if parsed.scheme != 'https' or parsed.hostname not in IMAGE_HOSTS:
        return ''
    name = f'{item_id}.webp'
    dst = MEDIA / name
    if dst.is_file() and dst.stat().st_size:
        return f'/assets/linkedin/media/{name}'
    try:
        req = urllib.request.Request(src, headers={'User-Agent': 'Mozilla/5.0 PortfolioPostCache/1.0'})
        with urllib.request.urlopen(req, timeout=20) as response:
            content_type = (response.headers.get('Content-Type') or '').lower()
            if not content_type.startswith('image/webp'):
                # No fingimos que un JPG/PNG es WEBP. Se mantiene URL externa.
                return src
            chunk = response.read(MAX_IMAGE_BYTES + 1)
            if not chunk or len(chunk) > MAX_IMAGE_BYTES:
                return src
        MEDIA.mkdir(parents=True, exist_ok=True)
        dst.write_bytes(chunk)
        return f'/assets/linkedin/media/{name}'
    except Exception as exc:
        print(f'Image fallback for {item_id}: {exc}')
        return src


def iso(text):
    return datetime.fromisoformat(text.replace('Z', '+00:00'))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--feed-file', help='Archivo JSON exportado')
    parser.add_argument('--feed-url', help='Feed público JSON de SociableKIT')
    parser.add_argument('--no-download-images', action='store_true')
    args = parser.parse_args()
    data = get_feed(args)
    if not isinstance(data.get('posts'), list):
        raise ValueError('El feed no contiene posts[]. Se conserva el historial sin cambios.')
    state = json.loads(STATE_PATH.read_text(encoding='utf-8'))
    baseline = iso(state['baselinePublishedAt'])
    saved = json.loads(POSTS_PATH.read_text(encoding='utf-8'))
    by_id = {str(p['id']): p for p in saved}
    if len(saved) != len(by_id):
        raise ValueError('Hay IDs duplicados en el historial local.')
    added = 0
    cached = 0
    for raw in sorted(data['posts'], key=lambda p: p.get('post_date_time') or p.get('date_time') or ''):
        pid = str(raw.get('id') or '')
        date = raw.get('post_date_time') or raw.get('date_time') or ''
        if not pid.isdigit() or not date:
            continue
        if pid in by_id:
            if not args.no_download_images and raw.get('thumbnail_sk_img') and not by_id[pid].get('imageUrl', '').startswith('/assets/'):
                new_image = cache_image(raw, pid)
                if new_image.startswith('/assets/'):
                    by_id[pid]['imageUrl'] = new_image
                    cached += 1
            continue
        if iso(date) <= baseline:
            continue  # Nunca importar los otros 27 posts antiguos.
        original = clean(raw.get('description') or '')
        if not original:
            continue
        headline = excerpt(original.split('. ')[0], 95)
        summary = excerpt(original, 250)
        # Publicaciones nuevas mantienen el idioma original en ES y EN.
        # No se inventan traducciones automáticas.
        content = {
            'id': pid,
            'title': {'es': headline, 'en': headline},
            'description': {'es': summary, 'en': summary},
            'category': {'es': 'PUBLICACIÓN', 'en': 'POST'},
            'publishedAt': date[:10],
            'imageUrl': '' if args.no_download_images else cache_image(raw, pid),
            'linkedInUrl': post_link(raw),
            'example': False,
        }
        if args.no_download_images:
            content['imageUrl'] = raw.get('thumbnail_sk_img') or raw.get('thumbnail_url') or ''
        by_id[pid] = content
        added += 1
    merged = sorted(by_id.values(), key=lambda p: (p.get('publishedAt') or '', p['id']), reverse=True)
    text = json.dumps(merged, ensure_ascii=False, indent=2) + '\n'
    if POSTS_PATH.read_text(encoding='utf-8') != text:
        POSTS_PATH.write_text(text, encoding='utf-8')
    print(f'OK existing={len(saved)} new={added} total={len(merged)} images_cached={cached}')


if __name__ == '__main__':
    main()
