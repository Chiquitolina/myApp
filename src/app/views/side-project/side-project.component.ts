import { Component, inject, signal } from '@angular/core';
import { ProjectsService } from '../../core/services/projects/projects.service';
import { Observable } from 'rxjs';
import { sideProject } from '../../core/interfaces/sideProject';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TechnologiesComponent } from '../../components/technologies/technologies.component';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-side-project',
  standalone: true,
  imports: [TranslateModule, MatFormFieldModule, TechnologiesComponent, MatExpansionModule, MatAccordion, MatIconModule],
  templateUrl: './side-project.component.html',
  styleUrl: './side-project.component.scss'
})
export class SideProjectComponent {

  readonly panelOpenState = signal(false);

  panelOpen = false;

  projectServ = inject(ProjectsService)

  sideProject$: Observable<sideProject | null>;
  sideProject!: sideProject;

  constructor() {
    this.sideProject$ = this.projectServ.selectedSide$;  // Asigna el observable
  }

  ngOnInit(): void {
    this.sideProject$.subscribe(project => {
      if (project) {
        this.sideProject = project
      }
    });
  }


}
