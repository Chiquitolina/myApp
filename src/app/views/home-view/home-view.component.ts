import { Component, Output, EventEmitter } from '@angular/core';
import { DrawingTextComponent } from '../../components/drawing-text/drawing-text.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { TranslateModule } from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [DrawingTextComponent, MenuComponent, TranslateModule, MatButtonModule],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss'
})
export class HomeViewComponent {

  @Output() notifyApp = new EventEmitter<void>(); // Define un EventEmitter para emitir eventos al componente padre

  handleMenuButtonClick() {
    this.notifyApp.emit(); // Emite el evento hacia el componente padre
  }

  downloadPdf(): void {
    const pdfUrl = 'https://drive.google.com/uc?export=download&id=1DIfuBFu-DOMqeVncQMzOO6uZEVZXmOFZ';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'ALEJANDRO IGNACIO GODINO - FULL STACK DEVELOPER.pdf';
    link.click();
  }

}
