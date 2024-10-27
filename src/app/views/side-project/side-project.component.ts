import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../services/projects/projects.service';
import { Observable } from 'rxjs';
import { sideProject } from '../../interfaces/sideProject';
import { TranslateModule } from '@ngx-translate/core';
import { ChipModule } from 'primeng/chip';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-side-project',
  standalone: true,
  imports: [TranslateModule, ChipModule, MatFormFieldModule],
  templateUrl: './side-project.component.html',
  styleUrl: './side-project.component.scss'
})
export class SideProjectComponent {

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
      console.log(this.sideProject)
    });
  }


}
