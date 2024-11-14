import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule, TranslateModule, ChipModule],
  templateUrl: './technologies.component.html',
  styleUrl: './technologies.component.scss'
})
export class TechnologiesComponent {

  @Input() technologies : any[] = [];

}
