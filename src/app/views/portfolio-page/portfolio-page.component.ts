import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Project } from '../../core/interfaces/projects';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { ThemeService } from '../../core/services/theme/theme.service';
import { SiteHeaderComponent } from '../../shared/components/site-header/site-header.component';
import { ProjectViewComponent } from '../project-view/project-view.component';

type Language = 'es' | 'en';

/**
 * Portfolio: grilla principal y entrada a los detalles /project/:id.
 * La vista de Inicio y sus publicaciones de LinkedIn no se modifican.
 */
@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, SiteHeaderComponent, ProjectViewComponent],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss',
})
export class PortfolioPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly projectsService = inject(ProjectsService);
  private readonly themeService = inject(ThemeService);
  private readonly translateService = inject(TranslateService);
  private readonly subscriptions = new Subscription();

  readonly cvUrl = 'https://drive.google.com/uc?export=download&id=16cPJpRkdbZ2zZnTIlM07lLey6zrpdxwV';

  projects: Project[] = [];
  selectedProject: Project | null = null;
  dark = true;
  language: Language = 'es';

  private readonly translations = {
    es: {
      eyebrow: 'PROYECTOS · DESARROLLO · PRODUCTOS',
      title: 'Portfolio',
      introduction: 'Una selección de proyectos de software, experimentos y productos donde aplico, exploro y comparto lo que aprendo.',
      explore: 'Explorar proyectos',
      downloadCV: 'Descargar CV',
      projectList: 'Proyectos',
      openProject: 'Ver proyecto',
      rights: 'Todos los derechos reservados',
    },
    en: {
      eyebrow: 'PROJECTS · DEVELOPMENT · PRODUCTS',
      title: 'Portfolio',
      introduction: 'A selection of software projects, experiments, and products where I apply, explore, and share what I learn.',
      explore: 'Explore projects',
      downloadCV: 'Download CV',
      projectList: 'Projects',
      openProject: 'View project',
      rights: 'All rights reserved',
    },
  };

  get t() { return this.translations[this.language]; }
  get currentYear(): number { return new Date().getFullYear(); }

  ngOnInit(): void {
    this.dark = this.themeService.isDarkMode();
    this.language = this.translateService.currentLang === 'en' ? 'en' : 'es';

    this.subscriptions.add(this.themeService.darkMode$.subscribe(value => {
      this.dark = value;
    }));
    this.subscriptions.add(this.translateService.onLangChange.subscribe(({ lang }) => {
      this.language = lang === 'en' ? 'en' : 'es';
    }));

    this.subscriptions.add(this.projectsService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.syncProjectFromRoute(this.route.snapshot.paramMap.get('id'));
    }));
    // La misma instancia puede permanecer viva al cambiar entre proyectos.
    this.subscriptions.add(this.route.paramMap.subscribe(params => {
      this.syncProjectFromRoute(params.get('id'));
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  category(project: Project): string {
    const labels: Record<number, { es: string; en: string }> = {
      0: { es: 'BLOG · DESARROLLO', en: 'BLOG · DEVELOPMENT' },
      1: { es: 'AUTENTICACIÓN · WEB', en: 'AUTHENTICATION · WEB' },
      2: { es: 'E-COMMERCE · FULL STACK', en: 'E-COMMERCE · FULL STACK' },
      3: { es: 'PRODUCTIVIDAD · WEB', en: 'PRODUCTIVITY · WEB' },
      4: { es: 'API · BACKEND', en: 'API · BACKEND' },
      5: { es: 'PORTFOLIO · ANGULAR', en: 'PORTFOLIO · ANGULAR' },
    };
    return (labels[project.id] ?? { es: 'DESARROLLO DE SOFTWARE', en: 'SOFTWARE DEVELOPMENT' })[this.language];
  }

  private syncProjectFromRoute(id: string | null): void {
    if (id === null) {
      this.selectedProject = null;
      this.projectsService.showProjectDetails = false;
      this.projectsService.selectedSide.next(null);
      this.projectsService.selectedProject.next(null);
      return;
    }
    if (!this.projects.length) return;

    const project = this.projects.find(item => String(item.id) === id);
    if (!project) {
      void this.router.navigate(['/portfolio'], { replaceUrl: true });
      return;
    }

    this.selectedProject = project;
    this.projectsService.selectProject(project);
    this.projectsService.showProjectDetails = true;
    this.projectsService.selectedSide.next(null);
  }
}
