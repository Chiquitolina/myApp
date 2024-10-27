import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss'
})
export class MenuButtonComponent {

  @Input() name!: string;  // Define el input para recibir el nombre del proyecto
  @Input() link!: string;  // Define el input para recibir el nombre del proyecto

  @Output() click = new EventEmitter<void>(); // Emite un evento cuando se hace clic en el botón

  onClick() {
    this.click.emit(); // Emite el evento de clic
  }

}
