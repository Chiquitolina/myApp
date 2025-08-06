import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private _translateServ = inject(TranslateService)

  constructor() {
    this.initTranslation();
  }

  private initTranslation() {
    // Establece el idioma predeterminado
    this._translateServ.setDefaultLang('es');
    // Usa un idioma específico (se puede ajustar dinámicamente)
    this._translateServ.use('es');
  }

  // Método para cambiar el idioma
  changeLanguage(language: string) {
    this._translateServ.use(language);
  }
}
