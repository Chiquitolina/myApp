import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-drawing-text',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './drawing-text.component.html',
  styleUrl: './drawing-text.component.scss',
})
export class DrawingTextComponent implements OnInit {
  themeServ = inject(ThemeService);

  currentThemeClass = '';

  ngOnInit(): void {
    this.themeServ.darkMode$.subscribe((isDarkMode) => {
      this.currentThemeClass = isDarkMode ? 'theme-dark' : 'theme-light';
    });
  }

}
