import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { DrawingTextComponent } from '../../components/drawing-text/drawing-text.component';
import { MenuComponent } from '../../core/components/menu/menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AnimateService } from '../../core/services/init-animation/animate.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [
    DrawingTextComponent,
    CommonModule,
    MenuComponent,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss',
})
export class HomeViewComponent implements OnInit {
  @Output() notifyApp = new EventEmitter<void>(); // Define un EventEmitter para emitir eventos al componente padre

  animateContainer = false;
  hasAnimatedClass = false;
  private animationKey = 'about-container'; // clave única para este bloque

  constructor(private animateService: AnimateService) {}

  handleMenuButtonClick() {
    this.notifyApp.emit(); // Emite el evento hacia el componente padre
  }

  downloadPdf(): void {
    const pdfUrl =
      'https://drive.google.com/uc?export=download&id=16cPJpRkdbZ2zZnTIlM07lLey6zrpdxwV';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'ALEJANDRO IGNACIO GODINO - FULL STACK DEVELOPER.pdf';
    link.click();
  }

  ngOnInit() {
    const hasAnimated = this.animateService.hasAnimated(this.animationKey);

    if (!hasAnimated) {
      // primera vez → disparar animación
      this.animateContainer = true;
    } else {
      // ya se animó → mantener visible
      this.hasAnimatedClass = true;
    }
  }
  markAnimated() {
    if (this.animateContainer) {
      this.animateService.setAnimated(this.animationKey);
      this.animateContainer = false;
      this.hasAnimatedClass = true;
    }
  }
}
