import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme/theme.service';

/** La misma librería VANTA.NET utilizada en la rama anterior (srcback.zip). */
interface VantaNetEffect {
  setOptions(options: Record<string, unknown>): void;
  destroy(): void;
  resize?(): void;
}

interface VantaGlobal {
  NET(options: Record<string, unknown>): VantaNetEffect;
}

declare global {
  interface Window {
    THREE?: unknown;
    VANTA?: VantaGlobal;
  }
}

@Component({
  selector: 'app-vanta-background',
  standalone: true,
  template: '<div #surface class="vanta-surface"></div>',
  styles: [`
    :host { display: block; width: 100%; height: 100%; overflow: hidden; }
    .vanta-surface { width: 100%; height: 100%; overflow: hidden; }
  `],
})
export class VantaBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('surface', { static: true }) private surface!: ElementRef<HTMLDivElement>;
  private readonly theme = inject(ThemeService);
  private readonly zone = inject(NgZone);
  private readonly router = inject(Router);
  private readonly subscription = new Subscription();
  private effect: VantaNetEffect | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private destroyed = false;
  private dark = true;
  private refreshTimer: ReturnType<typeof setTimeout> | null = null;

  // Se cargan una única vez aunque se navegue entre Inicio y Portfolio.
  private static scriptsPromise: Promise<void> | null = null;
  private static readonly THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js';
  private static readonly VANTA_URL = 'https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js';

  ngAfterViewInit(): void {
    this.dark = this.theme.isDarkMode();
    this.subscription.add(this.theme.darkMode$.subscribe(value => {
      this.dark = value;
      this.effect?.setOptions({
        backgroundColor: value ? 0x090909 : 0xe9ebed,
        color: value ? 0x0077ff : 0x3156b5,
      });
    }));

    // La misma instancia de VANTA vive en AppComponent durante todo el recorrido.
    // Tras un cambio de ruta forzamos un resize/repintado cuando termina
    // la animación de navegación (260 ms), sin destruir ni reinstanciar WebGL.
    this.subscription.add(this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) this.scheduleRefresh();
    }));

    // No usamos WebGL si el usuario solicitó reducir las animaciones.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    void VantaBackgroundComponent.ensureScripts().then(() => {
      if (this.destroyed || !window.VANTA?.NET) return;
      this.zone.runOutsideAngular(() => {
        try {
          this.effect = window.VANTA!.NET({
            el: this.surface.nativeElement,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: false, // evita interferir con el scroll táctil
            minHeight: 200,
            minWidth: 200,
            scale: 1,
            scaleMobile: 0.8,
            color: this.dark ? 0x0077ff : 0x3156b5,
            backgroundColor: this.dark ? 0x090909 : 0xe9ebed,
            shininess: 50,
            waveHeight: 20,
            waveSpeed: 1.2,
            zoom: 0.9,
            points: 8,
            maxDistance: 18,
            spacing: 18,
          });
          if (typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(() => this.effect?.resize?.());
            this.resizeObserver.observe(this.surface.nativeElement);
          }
        } catch (error) {
          console.warn('VANTA.NET no pudo inicializarse. Se conserva el fondo CSS.', error);
        }
      });
    }).catch(error => {
      // Si el CDN está bloqueado, el diseño sigue funcionando sin animación.
      console.warn('No se pudo cargar VANTA.NET; se conserva el fondo CSS.', error);
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.subscription.unsubscribe();
    if (this.refreshTimer !== null) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    this.resizeObserver?.disconnect();
    this.effect?.destroy();
    this.effect = null;
  }

  private scheduleRefresh(): void {
    if (this.refreshTimer !== null) clearTimeout(this.refreshTimer);
    this.refreshTimer = setTimeout(() => {
      this.refreshTimer = null;
      if (this.destroyed || !this.effect) return;
      this.zone.runOutsideAngular(() => {
        // Los canvas WebGL pueden quedar sin pintar al terminar un snapshot de ruta.
        this.effect?.resize?.();
        this.effect?.setOptions({
          backgroundColor: this.dark ? 0x090909 : 0xe9ebed,
          color: this.dark ? 0x0077ff : 0x3156b5,
        });
      });
    }, 310);
  }

  private static ensureScripts(): Promise<void> {
    if (window.THREE && window.VANTA?.NET) return Promise.resolve();
    if (!this.scriptsPromise) {
      this.scriptsPromise = (async () => {
        if (!window.THREE) await this.loadScript(this.THREE_URL);
        if (!window.VANTA?.NET) await this.loadScript(this.VANTA_URL);
        if (!window.VANTA?.NET) throw new Error('VANTA.NET no está disponible después de cargar el script');
      })().catch(error => {
        this.scriptsPromise = null; // permite volver a intentar luego
        throw error;
      });
    }
    return this.scriptsPromise;
  }

  private static loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const existing = Array.from(document.querySelectorAll<HTMLScriptElement>('script[src]'))
        .find(script => script.src === url);
      if (existing) {
        // Si ya existe, se espera a su carga; si había cargado, los globals
        // se habrían comprobado en ensureScripts antes de llegar acá.
        if (existing.dataset['agReady'] === 'true') { resolve(); return; }
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error(`Error al cargar ${url}`)), { once: true });
        return;
      }
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.addEventListener('load', () => {
        script.dataset['agReady'] = 'true';
        resolve();
      }, { once: true });
      script.addEventListener('error', () => {
        script.remove();
        reject(new Error(`Error al cargar ${url}`));
      }, { once: true });
      document.head.appendChild(script);
    });
  }
}
