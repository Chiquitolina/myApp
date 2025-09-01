import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  ErrorHandler,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),

    // ✅ Registro global de íconos SVG (con firma actualizada)
    {
      provide: MatIconRegistry,
      useFactory: (
        http: HttpClient,
        sanitizer: DomSanitizer,
        document: Document,
        errorHandler: ErrorHandler
      ) => {
        const registry = new MatIconRegistry(
          http,
          sanitizer,
          document,
          errorHandler
        );

        const icons = ['github', 'linkedin'];

        icons.forEach((icon) => {
          registry.addSvgIcon(
            icon,
            sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`)
          );
        });

        // Podés registrar más íconos:
        // registry.addSvgIcon('linkedin', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg'));

        return registry;
      },
      deps: [HttpClient, DomSanitizer, DOCUMENT, ErrorHandler],
    },
  ],
};
