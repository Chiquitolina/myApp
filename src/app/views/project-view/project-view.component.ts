import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Project } from '../../core/interfaces/projects';
import { sideProject } from '../../core/interfaces/sideProject';

type Language = 'es' | 'en';
type Localized = { es: string; en: string };

/** Detalle de proyecto: texto y CSS exclusivamente, sin fotografías ni mockups. */
@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss',
})
export class ProjectViewComponent implements OnInit, OnDestroy {
  @Input() project: Project | null = null;
  @Input() projects: Project[] = [];

  private readonly translate = inject(TranslateService);
  private readonly subscriptions = new Subscription();
  language: Language = 'es';

  private readonly copy = {
    es: {
      back: 'Volver al Portfolio', projects: 'Proyectos',
      highlights: 'Aspectos destacados', technologies: 'Tecnologías',
      architecture: 'Arquitectura del proyecto',
      visitApp: 'Ir a la App', repository: 'Ver en GitHub',
      openCode: 'Ver repositorio',
      noPublicDemo: 'Este proyecto no tiene una demo pública enlazada.',
      type: 'Tipo', projectType: 'Proyecto de software',
      parts: 'Componentes', client: 'Cliente', server: 'Servidor',
    },
    en: {
      back: 'Back to Portfolio', projects: 'Projects',
      highlights: 'Highlights', technologies: 'Technologies',
      architecture: 'Project architecture',
      visitApp: 'Open app', repository: 'View on GitHub',
      openCode: 'View repository',
      noPublicDemo: 'There is no public demo linked for this project.',
      type: 'Type', projectType: 'Software project',
      parts: 'Components', client: 'Client', server: 'Server',
    },
  };

  private readonly featureCopy: Record<number, { es: string[]; en: string[] }> = {
    0: {
      es: ['Bitácora de desarrollo y aprendizaje', 'Aplicación web', 'Componentes de cliente y servidor'],
      en: ['Development and learning journal', 'Web application', 'Client and server components'],
    },
    1: {
      es: ['Autenticación y formularios', 'Cliente Angular', 'Servicios de backend'],
      en: ['Authentication and forms', 'Angular client', 'Backend services'],
    },
    2: {
      es: ['Experiencia de compra', 'Gestión de productos y pedidos', 'Herramientas de administración y análisis'],
      en: ['Shopping experience', 'Product and order management', 'Administration and analytics tools'],
    },
    3: {
      es: ['Organización de actividades', 'Aplicación web con Angular'],
      en: ['Activity organization', 'Angular web application'],
    },
    4: {
      es: ['Gestión de jugadores mediante CRUD', 'Formación de equipos según habilidades', 'Acciones protegidas mediante Bearer Token'],
      en: ['CRUD player management', 'Team building based on abilities', 'Bearer Token-protected actions'],
    },
    5: {
      es: ['Interfaz desarrollada con Angular', 'Traducción multilenguaje', 'Temas claro y oscuro', 'Estado reactivo con observables'],
      en: ['Angular-based interface', 'Multilingual translations', 'Light and dark themes', 'Reactive state with observables'],
    },
  };

  get t() { return this.copy[this.language]; }

  get highlights(): string[] {
    return this.project ? (this.featureCopy[this.project.id]?.[this.language] ?? []) : [];
  }

  get category(): string {
    if (!this.project) return this.t.projectType;
    const categories: Record<number, Localized> = {
      0: { es: 'BLOG · DESARROLLO', en: 'BLOG · DEVELOPMENT' },
      1: { es: 'APLICACIÓN WEB', en: 'WEB APPLICATION' },
      2: { es: 'E-COMMERCE · FULL STACK', en: 'E-COMMERCE · FULL STACK' },
      3: { es: 'PRODUCTIVIDAD · WEB', en: 'PRODUCTIVITY · WEB' },
      4: { es: 'API · BACKEND', en: 'API · BACKEND' },
      5: { es: 'PORTFOLIO · ANGULAR', en: 'PORTFOLIO · ANGULAR' },
    };
    return (categories[this.project.id] ?? { es: 'PROYECTO DE SOFTWARE', en: 'SOFTWARE PROJECT' })[this.language];
  }

  get appUrl(): string | null {
    return this.safeUrl(this.project?.link);
  }

  get repositoryUrl(): string | null {
    return this.safeUrl(this.project?.linkRepository);
  }

  get technologyNames(): string[] {
    if (!this.project) return [];
    const sources = [
      this.project.technologies ?? [],
      this.project.clientSide?.technologies ?? [],
      this.project.serverSide?.technologies ?? [],
    ];
    const names = sources.flatMap(source => source.map(item => String(item?.name ?? '').trim())).filter(Boolean);
    return [...new Set(names)];
  }

  get architectureParts(): { key: string; label: string; value: sideProject }[] {
    if (!this.project) return [];
    const result: { key: string; label: string; value: sideProject }[] = [];
    if (this.project.clientSide) result.push({ key: 'client', label: this.t.client, value: this.project.clientSide });
    if (this.project.serverSide) result.push({ key: 'server', label: this.t.server, value: this.project.serverSide });
    return result;
  }

  safeUrl(value?: string): string | null {
    return value && /^https?:\/\//i.test(value) ? value : null;
  }

  ngOnInit(): void {
    this.language = this.translate.currentLang === 'en' ? 'en' : 'es';
    this.subscriptions.add(this.translate.onLangChange.subscribe(({ lang }) => {
      this.language = lang === 'en' ? 'en' : 'es';
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
