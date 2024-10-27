import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class ThemeService {

    private darkMode = new BehaviorSubject<boolean>(false);
    darkMode$ = this.darkMode.asObservable();

    private darkClassName = 'theme-dark';
    private lightClassName = 'theme-light';

    setDarkMode(isDarkMode: boolean) {
      this.darkMode.next(isDarkMode);
      const themeClass = isDarkMode ? this.darkClassName : this.lightClassName;
      document.body.classList.add(themeClass);
      document.body.classList.remove(isDarkMode ? this.lightClassName : this.darkClassName);
    }

  }
