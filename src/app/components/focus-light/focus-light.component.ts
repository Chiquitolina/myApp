import { Component, inject, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-focus-light',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './focus-light.component.html',
  styleUrl: './focus-light.component.scss'
})
export class FocusLightComponent implements OnInit, OnDestroy {

  private themeSubscription!: Subscription;
  currentThemeClass = '';

  private themeService = inject(ThemeService)

  ngOnInit(): void {
    // Suscribirse al cambio de tema
    this.themeSubscription = this.themeService.darkMode$.subscribe(isDarkMode => {
      this.currentThemeClass = isDarkMode ? 'theme-dark' : 'theme-light';
    });
  }

  ngOnDestroy(): void {
    // Limpiar suscripción al destruir el componente
    this.themeSubscription.unsubscribe();
  }

}
