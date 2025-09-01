import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

declare var VANTA: any; // 👈 Importante para que TS reconozca la librería
declare var THREE: any; // 👈 Vanta necesita Three.js

@Component({
  selector: 'app-background',
  standalone: true,
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'], // 👈 PLURAL
})
export class BackgroundComponent implements AfterViewInit {

  @ViewChild('vantaBg', { static: true }) vantaRef!: ElementRef;
  vantaEffect: any;

    ngAfterViewInit(): void {
    this.vantaEffect = VANTA.NET({
      el: this.vantaRef.nativeElement,
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x0077ff,
      backgroundColor: 0x000000, // 👈 usa número en hex si podés
      shininess: 50,
      waveHeight: 20,
      waveSpeed: 1.2,
      zoom: 0.9,
    });
  }
}
