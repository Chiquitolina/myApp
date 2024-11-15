import {
  Component,
  HostListener,
  HostBinding,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FocusLightComponent } from './components/focus-light/focus-light.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { ProjectViewComponent } from './views/project-view/project-view.component';
import { ProjectsService } from './services/projects/projects.service';
import { Project } from './interfaces/projects';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from './services/theme/theme.service';
import { TranslationService } from './services/translation/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from './components/menu/menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { SideProjectComponent } from './views/side-project/side-project.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FocusLightComponent,
    HeaderComponent,
    FormsModule,
    MatSlideToggleModule,
    FooterComponent,
    HomeViewComponent,
    ProjectViewComponent,
    CommonModule,
    TranslateModule,
    MenuComponent,
    MatSidenavModule,
    MatIconModule,
    SideProjectComponent,
    SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio2024';

  @ViewChild('container') containerRef!: ElementRef;

  ngOnInit(): void {
    this.themeServ.darkMode$.subscribe((isDarkMode) => {
      this.currentThemeClass = isDarkMode ? 'theme-dark' : 'theme-light';
    });

    this.projectServ.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  projectServ = inject(ProjectsService);
  themeServ = inject(ThemeService);
  translateServ = inject(TranslationService);

  projects: Project[] = [];
  isFlipped = false;
  currentThemeClass = '';
  isFading: boolean | null = null; // Cambiado a null inicialmente

  @HostBinding('class') className = '';

  flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }

  selectProject(project: Project) {
    this.projectServ.selectProject(project);
    this.projectServ.showProjectDetails = true; // Cambiar el estado a mostrar detalles del proyecto
    this.flipCard();
  }

  goBack() {
    this.projectServ.showProjectDetails = false; // Cambiar el estado para regresar al home view
    this.flipCard();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const focusElement = document.querySelector('.focus') as HTMLElement;
    if (focusElement) {
      focusElement.style.left = `${event.pageX}px`;
      focusElement.style.top = `${event.pageY}px`;
    }
  }

  handleNotification() {
    this.flipCard();
  }

  onFadeStatusChange(fadeStatus: boolean) {
    this.isFading = fadeStatus;
  }
}
