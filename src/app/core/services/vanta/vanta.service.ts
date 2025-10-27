import { Injectable, NgZone, OnDestroy } from '@angular/core';
import NET from 'vanta/dist/vanta.net.min';

@Injectable({
  providedIn: 'root',
})
export class VantaService implements OnDestroy {
  private vantaEffect: any;

  constructor(private ngZone: NgZone) {}

  initVanta(): void {
    // Verificá si el contenedor existe
    const element = document.getElementById('vanta-bg');
    if (!element) {
      console.warn('VantaService: no se encontró el contenedor #vanta-bg');
      return;
    }

    // Define el color inicial (según la clase actual del body)
    const isDark = document.body.classList.contains('theme-dark');
    const backgroundColor = isDark ? 0x000000 : 0xffffff;

    // Inicializa el efecto fuera del ciclo de Angular
    this.ngZone.runOutsideAngular(() => {
       this.vantaEffect = NET({
        el: element,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x0077ff,
        backgroundColor,         // ⚫ o ⚪ según tema
        shininess: 50,
        waveHeight: 20,
        waveSpeed: 1.2,
        zoom: 1,
      });
    });
  }

  /** 🔄 Permite cambiar el color de fondo dinámicamente */
  updateBackground(isDarkMode: boolean): void {
    if (this.vantaEffect) {
      this.vantaEffect.setOptions({
        backgroundColor: isDarkMode ? 0x000000 : 0xffffff,
      });
    }
  }

  destroyVanta(): void {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
      this.vantaEffect = null;
    }
  }

  ngOnDestroy(): void {
    this.destroyVanta();
  }
}