import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VantaBackgroundComponent } from './shared/components/vanta-background/vanta-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VantaBackgroundComponent],
  template: `
    <app-vanta-background aria-hidden="true"></app-vanta-background>
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host { display: block; position: relative; isolation: isolate; min-height: 100dvh; }
    app-vanta-background {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      /* Canvas independiente del snapshot root de View Transitions. */
      view-transition-name: ag-vanta-backdrop;
    }
    router-outlet { display: none; }
    :host > app-landing-page,
    :host > app-portfolio-page { position: relative; z-index: 1; }
  `]
})
export class AppComponent {}
