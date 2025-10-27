import {
  Component,
  HostListener,
  HostBinding,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FocusLightComponent } from './components/focus-light/focus-light.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { ProjectViewComponent } from './views/project-view/project-view.component';
import { ProjectsService } from './core/services/projects/projects.service';
import { Project } from './core/interfaces/projects';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from './core/services/theme/theme.service';
import { TranslationService } from './core/services/translation/translation.service';
import { TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from './core/components/menu/menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BackgroundComponent } from './shared/components/background/background.component';
import { DrawingTextComponent } from './components/drawing-text/drawing-text.component';
import { AnimateService } from './core/services/init-animation/animate.service';
import { VantaService } from './core/services/vanta/vanta.service';
import { Subscription } from 'rxjs';
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
    SidebarComponent,
    BackgroundComponent,
    DrawingTextComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio2024';

  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild(MenuComponent) menuComponent!: MenuComponent; // Referencia al MenuComponent

  projectServ = inject(ProjectsService);
  themeServ = inject(ThemeService);
  private cdr = inject(ChangeDetectorRef);
  translateServ = inject(TranslationService);
  animateServ = inject(AnimateService);
  vantaServ = inject(VantaService);

  private subs = new Subscription();
  private initialized = false;

  projects: Project[] = [];
  isFlipped = false;
  currentThemeClass = '';
  isFading: boolean | null = null; // Cambiado a null inicialmente

  shouldDeselectAll = false; // Variable para controlar la deselección

  animateContainer = false;
  hasAnimatedClass = false;
  private animationKey = 'menu'; // clave única para este bloque

  @HostBinding('class') className = '';

   ngOnInit(): void {
    const hasAnimated = this.animateServ.hasAnimated(this.animationKey);

    if (!hasAnimated) {
      this.animateContainer = true;
    } else {
      this.hasAnimatedClass = true;
    }

    // 🔄 Suscribimos al cambio de tema
    this.subs.add(
      this.themeServ.darkMode$.subscribe((isDarkMode) => {
        this.currentThemeClass = isDarkMode ? 'theme-dark' : 'theme-light';
        this.vantaServ.updateBackground(isDarkMode); // ← cambia color de Vanta dinámicamente
        this.cdr.detectChanges();
      })
    );

    this.projectServ.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
  // ✅ Inicializa Vanta al tener disponible el DOM
  ngAfterViewInit(): void {
    this.vantaServ.initVanta();
  }

  flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }

  selectProject(project: Project) {
    this.projectServ.selectProject(project);
    this.projectServ.showProjectDetails = true; // Cambiar el estado a mostrar detalles del proyecto
    this.flipCard();
  }

  onDeselectAll() {
    if (this.menuComponent) {
      this.menuComponent.nullearr(); // Llama al método en el MenuComponent
    }
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

  // Maneja el evento de deselección
  onDeselectAllTriggered(): void {
    this.shouldDeselectAll = true;
  }

  handleNotification() {
    this.flipCard();
  }

  onFadeStatusChange(fadeStatus: boolean) {
    this.isFading = fadeStatus;
  }

  markAnimated() {
    if (this.animateContainer) {
      this.animateServ.setAnimated(this.animationKey);
      this.animateContainer = false;
      this.hasAnimatedClass = true;
    }
  }
  ngOnDestroy(): void {
    this.vantaServ.destroyVanta();
    this.subs.unsubscribe();
  }

}
