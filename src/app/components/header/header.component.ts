import { Component, Output, EventEmitter, inject, HostBinding } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../services/projects/projects.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Observable, Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme/theme.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { sideProject } from '../../interfaces/sideProject';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatSlideToggleModule, FormsModule,ReactiveFormsModule, CommonModule, TranslateModule, MatIconModule, MatButtonModule, SidebarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Output() notifyApp = new EventEmitter<void>()
  @Output() toggleSidenav = new EventEmitter<void>();

  @Output() fadeStatusChange = new EventEmitter<boolean>();


  private themeSubscription!: Subscription;
  currentThemeClass = '';

  sidebarVisible: boolean = false;

  _projectServ = inject(ProjectsService);
  themeServ = inject(ThemeService);
  translateServ = inject(TranslationService)

  sideProject$: Observable<sideProject | null>;
  sideProject!: sideProject | null;

  toggleControl = new FormControl(true);
  translateToggleControl = new FormControl(false)

  isFading: boolean | null = null; // Cambiado a null inicialmente

  constructor() {
    this.sideProject$ = this._projectServ.selectedSide$;  // Asigna el observable
  }

  ngOnInit(): void {
    this.themeServ.darkMode$.subscribe((isDarkMode) => {
      this.currentThemeClass = isDarkMode ? 'theme-dark' : 'theme-light';
    });

    this.sideProject$.subscribe(project => {
      if (project) {
        this.sideProject = project
      }
    });

    // Actualiza el tema según el valor inicial del toggle
    this.themeServ.setDarkMode(this.toggleControl.value ?? false);

    // Suscripción al cambio de valor en el toggle
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      this.themeServ.setDarkMode(darkMode ?? false);
    });

    this.translateToggleControl.valueChanges.subscribe((isEnglish: boolean | null) => {
      // Antes de cambiar el idioma, activa la animación de fade-out
      this.isFading = true;  // Suponiendo que tienes la propiedad isFading para manejar la animación
      this.fadeStatusChange.emit(this.isFading);
    
      // Después de un tiempo (durante la animación), cambia el idioma
      setTimeout(() => {
        const selectedLanguage = isEnglish ? 'en' : 'es';
        this.translateServ.changeLanguage(selectedLanguage);
        console.log(selectedLanguage);
    
        // Una vez que el idioma ha cambiado, activa la animación de fade-in
        this.isFading = false;
        this.fadeStatusChange.emit(this.isFading);
      }, 500);  // Ajusta el tiempo según la duración de tu animación (en milisegundos)
    });
  }

  ngOnDestroy(): void {
    // Limpiar suscripción al destruir el componente
    this.themeSubscription.unsubscribe();
  }

  handleMenuButtonClick() {
    this.notifyApp.emit();
  }

  goBack() {
    this._projectServ.showProjectDetails = false;
    this._projectServ.selectedSide.next(null)
    this.sideProject = null
  }

  onMenuButtonClick() {
    this.toggleSidenav.emit();  // Emite el evento cuando se hace clic
  }

}
