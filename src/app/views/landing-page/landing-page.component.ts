import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../core/services/theme/theme.service';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { LinkedInPostCard } from './post.model';

type Language = 'es' | 'en';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, SiteHeaderComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private themeService = inject(ThemeService);
  private ngxTranslate = inject(TranslateService);
  private subscriptions = new Subscription();
  private http = inject(HttpClient);

  readonly linkedInProfile = 'https://www.linkedin.com/in/alejandro-ignacio-godino/';
  readonly cvUrl = 'https://drive.google.com/uc?export=download&id=16cPJpRkdbZ2zZnTIlM07lLey6zrpdxwV';
  posts: LinkedInPostCard[] = [];
  showAll = false;
  postsLoadError = false;

  get visiblePosts(): LinkedInPostCard[] {
    return this.showAll ? this.posts : this.posts.slice(0, 3);
  }
  toggleAllPosts(): void { this.showAll = !this.showAll; }
  hideBrokenImage(event: Event): void {
    // No mostramos el icono de imagen rota si el CDN externo deja de responder.
    const img = event.target;
    if (img instanceof HTMLImageElement) img.style.display = 'none';
  }

  dark = true;
  language: Language = 'es';
  readonly copy = {
    es: {
      navHome: 'Inicio', navPortfolio: 'Portfolio',
      eyebrow: 'TECNOLOGÍA · CIENCIA',
      title: 'Ideas, proyectos y aprendizajes.',
      lead: 'Desarrollo, investigación y aprendizaje en software.',
      explore: 'Explorar portfolio', profile: 'Mi LinkedIn', downloadCV: 'Descargar CV', posts: 'Últimas publicaciones',
      demo: 'Ejemplo de tarjeta', disclaimer: 'Boceto inicial: reemplazá estas tarjetas por tus publicaciones reales de LinkedIn.',
      published: 'Publicado', rights: 'Todos los derechos reservados',
      theme: 'Cambiar tema',
      seeAll: 'Ver todas las publicaciones', showLess: 'Mostrar menos',
      loadingError: 'No se pudieron cargar las publicaciones.',
    },
    en: {
      navHome: 'Home', navPortfolio: 'Portfolio',
      eyebrow: 'SOFTWARE · TECHNOLOGY · SCIENCE',
      title: 'Ideas, projects, and lessons learned.',
      lead: 'I share what I build, research, and learn in the world of software.',
      explore: 'Explore portfolio', profile: 'My LinkedIn', downloadCV: 'Download CV', posts: 'Latest posts',
      demo: 'Sample card', disclaimer: 'Initial mockup: replace these cards with your actual LinkedIn posts.',
      published: 'Published', rights: 'All rights reserved',
      theme: 'Switch theme',
      seeAll: 'View all posts', showLess: 'Show fewer',
      loadingError: 'Unable to load posts.',
    },
  };

  get t() { return this.copy[this.language]; }

  ngOnInit(): void {
    this.subscriptions.add(this.http.get<LinkedInPostCard[]>('assets/linkedin/posts.json').subscribe({
      next: (posts) => {
        this.posts = [...posts].sort((a, b) =>
          (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '')
        );
      },
      error: () => { this.postsLoadError = true; },
    }));
    this.dark = this.themeService.isDarkMode();
    this.language = this.ngxTranslate.currentLang === 'en' ? 'en' : 'es';
    this.subscriptions.add(this.themeService.darkMode$.subscribe((value) => this.dark = value));
    this.subscriptions.add(this.ngxTranslate.onLangChange.subscribe(({ lang }) => {
      this.language = lang === 'en' ? 'en' : 'es';
    }));
  }

  ngOnDestroy(): void { this.subscriptions.unsubscribe(); }
  localize(value: { es: string; en: string }): string { return value[this.language]; }
  formatDate(value?: string): string {
    if (!value) return '';
    const date = new Date(`${value}T12:00:00`);
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat(
      this.language === 'es' ? 'es-AR' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }
    ).format(date);
  }
}
