import importlib.util
import json
import pathlib
import sys
import tempfile
import unittest
from unittest.mock import patch

SCRIPT = pathlib.Path(__file__).resolve().parents[1] / 'scripts/sync_linkedin_feed.py'
spec = importlib.util.spec_from_file_location('linkedin_sync', SCRIPT)
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)

class SyncTests(unittest.TestCase):
    def test_non_linkedin_post_url_is_not_used(self):
        self.assertEqual(sync.post_link({'id': '7508308045979021312', 'post_url': 'https://example.com'}),
                         'https://www.linkedin.com/feed/update/urn:li:activity:7508308045979021312/')
    def test_html_removed(self):
        self.assertEqual(sync.clean('a<br />b &amp; c'), 'a b & c')
    def test_new_posts_accumulate_old_posts_do_not(self):
        with tempfile.TemporaryDirectory() as temp:
            t = pathlib.Path(temp)
            posts=t/'posts.json';state=t/'state.json'
            posts.write_text(json.dumps([{'id':'100','publishedAt':'2026-09-23'}]))
            state.write_text(json.dumps({'baselinePublishedAt':'2026-09-23T07:35:35+08:00'}))
            feed=t/'feed.json'
            feed.write_text(json.dumps({'posts':[
               {'id':'50','post_date_time':'2026-08-03T00:00:00+08:00','description':'old'},
               {'id':'100','post_date_time':'2026-09-23T07:35:35+08:00','description':'initial'},
               {'id':'200','post_date_time':'2026-11-17T08:00:00+08:00','description':'new post'},
            ]}))
            with patch.object(sync, 'POSTS_PATH', posts), patch.object(sync, 'STATE_PATH', state):
                with patch.object(sys,'argv',['sync','--feed-file',str(feed),'--no-download-images']):
                    sync.main()
                    sync.main()
            result=json.loads(posts.read_text())
            self.assertEqual(set(p['id'] for p in result), {'100','200'})
            self.assertEqual(len(result),2)

if __name__ == '__main__':unittest.main()
