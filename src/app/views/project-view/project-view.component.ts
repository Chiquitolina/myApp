import { Component, Output, EventEmitter, inject } from '@angular/core';
import { MenuComponent } from '../../core/components/menu/menu.component';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { Observable } from 'rxjs';
import { Project } from '../../core/interfaces/projects';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TechnologiesComponent } from '../../components/technologies/technologies.component';
import { UrlHealthMonitorComponent } from 'url-health-monitor';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs'

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [
    MenuComponent,
    TranslateModule,
    MatIconModule,
    CommonModule,
    TechnologiesComponent,
    UrlHealthMonitorComponent,
    MatTabsModule,
    MatExpansionModule,
  ],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss',
})
export class ProjectViewComponent {
  
  @Output() notifyApp = new EventEmitter<void>(); // Define un EventEmitter para emitir eventos al componente padre

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;


  selectedProject$: Observable<Project | null>;

  firstOpen = true;

  project!: Project;
  showDetails: boolean = true;

  panels = [
    { title: 'Información', content: '' },
    { title: 'Tecnologías utilizadas', content: 'Contenido del panel 2' },
  ];

  openedIndex = 0; // 👈 por defecto se abre el primero

  private projectServ = inject(ProjectsService);

  constructor() {
    this.selectedProject$ = this.projectServ.selectedProject$; // Asigna el observable
  }

  ngOnInit(): void {
  this.selectedProject$.subscribe((project) => {
    if (project) {
      this.project = project;
      this.panels[0].content = project.clientSide?.description || '';

      // 👇 Reinicia siempre al primer tab cuando cambia el proyecto
      setTimeout(() => {
        if (this.tabGroup) {
          this.tabGroup.selectedIndex = 0;
        }
      });

      console.log(project);
    }
  });
}

  setOpened(index: number): void {
    this.openedIndex = index; // solo uno puede estar abierto a la vez
  }

  handleMenuButtonClick() {
    console.log('Menu button clicked in ProjectView');
    this.notifyApp.emit(); // Emite el evento hacia el componente padre
  }
}
