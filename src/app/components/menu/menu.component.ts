import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { MenuButtonComponent } from '../menu-button/menu-button.component';
import { ProjectsService } from '../../services/projects/projects.service';
import { Project } from '../../interfaces/projects';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme/theme.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { sideProject } from '../../interfaces/sideProject';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuButtonComponent,
    CommonModule,
    RouterLink,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuComponent {
  @Output() notifyApp = new EventEmitter<void>(); // Define un EventEmitter para emitir eventos al componente padre
  projects: Project[] = [];
  currentThemeClass: string = '';

  showDetails = false; // Estado inicial: detalles ocultos

  visibleDetailIndex: number | null = null;

  private projectServ = inject(ProjectsService);
  private themeServ = inject(ThemeService);

  ngOnInit() {
    this.projectServ.getProjects().subscribe({
      next: (data) => {
        this.projects = data; // Esto es el 'next'
      },
      error: (error) => {
        console.error('Error:', error); // Esto es el 'error'
      },
      complete: () => {},
    });

    this.themeServ.darkMode$.subscribe((isDarkMode) => {
      this.currentThemeClass = isDarkMode ? 'theme-dark' : 'theme-light';
    });
  }

  selectProject(project: Project, index: number) {
    this.projectServ.selectProject(project);
    this.projectServ.showProjectDetails = true;
    if (this.visibleDetailIndex != index) {
    this.visibleDetailIndex = null;
    }
  }

  selectSide(side: sideProject) {
    this.projectServ.selectSide(side);
    this.projectServ.showProjectDetails = false;
  }

  handleMenuButtonClick() {
    this.notifyApp.emit();
  }

  toggleDetails(index: number) {
    this.visibleDetailIndex = this.visibleDetailIndex === index ? null : index;
  }
}
