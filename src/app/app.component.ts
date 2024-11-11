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
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from './services/theme/theme.service';
import { TranslationService } from './services/translation/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from './components/menu/menu.component';
import {MatSidenavModule} from '@angular/material/sidenav';
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
    ReactiveFormsModule,
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
    SidebarComponent
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

    // Actualiza el tema según el valor inicial del toggle
    this.themeServ.setDarkMode(this.toggleControl.value ?? false);

    // Suscripción al cambio de valor en el toggle
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      this.themeServ.setDarkMode(darkMode ?? false);
    });

    this.projectServ.getProjects().subscribe((projects) => {
      this.projects = projects;
    });

    this.translateToggleControl.valueChanges.subscribe((isEnglish: boolean | null) => {
      // Antes de cambiar el idioma, activa la animación de fade-out
      this.isFading = true;  // Suponiendo que tienes la propiedad isFading para manejar la animación
    
      // Después de un tiempo (durante la animación), cambia el idioma
      setTimeout(() => {
        const selectedLanguage = isEnglish ? 'en' : 'es';
        this.translateServ.changeLanguage(selectedLanguage);
        console.log(selectedLanguage);
    
        // Una vez que el idioma ha cambiado, activa la animación de fade-in
        this.isFading = false;
      }, 500);  // Ajusta el tiempo según la duración de tu animación (en milisegundos)
    });
  }

  projectServ = inject(ProjectsService);
  themeServ = inject(ThemeService);
  translateServ = inject(TranslationService)

  projects: Project[] = [];
  isFlipped = false;
  toggleControl = new FormControl(true);
  translateToggleControl = new FormControl(false)
  currentThemeClass = '';

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

  isFading: boolean | null = null; // Cambiado a null inicialmente
}
