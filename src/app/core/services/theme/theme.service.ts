import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // El portfolio anterior se iniciaba en modo oscuro; lo mantenemos.
  private darkMode = new BehaviorSubject<boolean>(true);
  readonly darkMode$ = this.darkMode.asObservable();

  constructor() {
    this.setDarkMode(true);
  }

  isDarkMode(): boolean {
    return this.darkMode.value;
  }

  setDarkMode(isDarkMode: boolean): void {
    this.darkMode.next(isDarkMode);
    const themeClass = isDarkMode ? 'theme-dark' : 'theme-light';
    document.body.classList.add(themeClass);
    document.body.classList.remove(isDarkMode ? 'theme-light' : 'theme-dark');
  }
}
