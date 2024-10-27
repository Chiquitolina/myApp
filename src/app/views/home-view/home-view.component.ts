import { Component, Output, EventEmitter } from '@angular/core';
import { DrawingTextComponent } from '../../components/drawing-text/drawing-text.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [DrawingTextComponent, MenuComponent, TranslateModule],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss'
})
export class HomeViewComponent {

  @Output() notifyApp = new EventEmitter<void>(); // Define un EventEmitter para emitir eventos al componente padre

  handleMenuButtonClick() {
    console.log('Menu button clicked in Homeview');
    this.notifyApp.emit(); // Emite el evento hacia el componente padre
  }

}
