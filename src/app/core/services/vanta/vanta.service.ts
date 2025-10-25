import { Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

@Injectable({
  providedIn: 'root'
})
export class VantaService {

    private vantaEffect: any;

  constructor(private ngZone: NgZone) { }

   ngAfterViewInit() {
    this.initVanta();
  }

  initVanta() {
    const theme = document.body.classList.contains('theme-light') ? 'light' : 'dark';

    const backgroundColor = theme === 'light' ? 0xffffff : 0x000000;
    const color = theme === 'light' ? 0x0077ff : 0x00bfff;

    this.ngZone.runOutsideAngular(() => {
      this.vantaEffect = NET({
        el: '#vanta-bg',
        THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color,
        backgroundColor,
        shininess: 50,
        waveHeight: 20,
        waveSpeed: 1.2,
        zoom: 5,
      });
    });
  }

  changeTheme() {
    const theme = document.body.classList.contains('theme-light') ? 'light' : 'dark';
    if (this.vantaEffect) {
      this.vantaEffect.setOptions({
        backgroundColor: theme === 'light' ? 0xffffff : 0x000000,
        color: theme === 'light' ? 0x0077ff : 0x00bfff,
      });
    }
  }
  
}