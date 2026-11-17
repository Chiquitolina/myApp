import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../core/services/theme/theme.service';
import { TranslationService } from '../../../core/services/translation/translation.service';

type Language = 'es' | 'en';

/** Navegación y controles compartidos por Inicio y Portfolio. */
@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.scss',
})
export class SiteHeaderComponent implements OnInit, OnDestroy {
  private readonly themeService = inject(ThemeService);
  private readonly translationService = inject(TranslationService);
  private readonly ngxTranslate = inject(TranslateService);
  private readonly subscriptions = new Subscription();

  dark = this.themeService.isDarkMode();
  language: Language = 'es';

  get labels() {
    return this.language === 'en'
      ? { home: 'Home', portfolio: 'Portfolio', theme: 'Change theme', language: 'Language' }
      : { home: 'Inicio', portfolio: 'Portfolio', theme: 'Cambiar tema', language: 'Idioma' };
  }

  ngOnInit(): void {
    this.language = this.ngxTranslate.currentLang === 'en' ? 'en' : 'es';
    this.subscriptions.add(this.themeService.darkMode$.subscribe(value => this.dark = value));
    this.subscriptions.add(this.ngxTranslate.onLangChange.subscribe(({ lang }) => {
      this.language = lang === 'en' ? 'en' : 'es';
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.setDarkMode(!this.dark);
  }

  changeLanguage(language: Language): void {
    if (language !== this.language) this.translationService.changeLanguage(language);
  }
}
