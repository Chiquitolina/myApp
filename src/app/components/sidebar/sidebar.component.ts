import { Component, Output, EventEmitter, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from '../menu/menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme/theme.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, TranslateModule, MenuComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  currentThemeClass: string = '';

  themeServ = inject(ThemeService);

  @Output() notifyApp = new EventEmitter<void>();

  ngOnInit() {
    this.themeServ.darkMode$.subscribe((isDarkMode) => {
      this.currentThemeClass = isDarkMode ? 'theme-dark' : 'theme-light';
    });
  }

  handleNotification() {
    this.notifyApp.emit();
  }
}
