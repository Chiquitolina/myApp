import { Component, Output, EventEmitter, inject } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { ProjectsService } from '../../services/projects/projects.service';
import { Observable } from 'rxjs';
import { Project } from '../../interfaces/projects';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [MenuComponent, TranslateModule, CommonModule, ChipModule],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent {
  
  @Output() notifyApp = new EventEmitter<void>(); // Define un EventEmitter para emitir eventos al componente padre

  selectedProject$: Observable<Project | null>;

  project!: Project
  showDetails : boolean = true;

  private projectServ = inject(ProjectsService)

    constructor() {
      this.selectedProject$ = this.projectServ.selectedProject$;  // Asigna el observable
    }

  ngOnInit(): void {
    this.selectedProject$.subscribe(project => {
      if (project) {
        this.project = project
      }
    });
  }

  handleMenuButtonClick() {
    console.log('Menu button clicked in ProjectView');
    this.notifyApp.emit(); // Emite el evento hacia el componente padre
  }

}
