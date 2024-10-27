import { Component, Output, EventEmitter, inject, HostBinding } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../services/projects/projects.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormControl, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme/theme.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatSlideToggleModule, FormsModule, CommonModule, TranslateModule, MatIconModule, MatButtonModule, SidebarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Output() notifyApp = new EventEmitter<void>()
  @Output() toggleSidenav = new EventEmitter<void>();

  private themeSubscription!: Subscription;
  currentThemeClass = '';

  sidebarVisible: boolean = false;

  _projectServ = inject(ProjectsService);
  themeServ = inject(ThemeService);

  ngOnInit(): void {
    this.themeServ.darkMode$.subscribe((isDarkMode) => {
      this.currentThemeClass = isDarkMode ? 'theme-dark' : 'theme-light';
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
  }

  onMenuButtonClick() {
    this.toggleSidenav.emit();  // Emite el evento cuando se hace clic
  }

}
