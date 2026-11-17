import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../services/projects/projects.service';
import { sideProject } from '../../interfaces/sideProject';
import { SiteHeaderComponent } from '../../../shared/components/site-header/site-header.component';

/** Encabezado del Portfolio. Reutiliza exactamente los controles del Inicio. */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SiteHeaderComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() notifyApp = new EventEmitter<void>();
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() fadeStatusChange = new EventEmitter<boolean>(); // Compatibilidad con PortfolioPage
  @Output() deselectAll = new EventEmitter<void>();

  readonly projectServ = inject(ProjectsService);
  private readonly subscriptions = new Subscription();
  sideProject: sideProject | null = null;

  get hasOpenProject(): boolean {
    return this.projectServ.showProjectDetails || this.sideProject !== null;
  }

  ngOnInit(): void {
    this.subscriptions.add(this.projectServ.selectedSide$.subscribe(project => {
      this.sideProject = project;
    }));
  }

  ngOnDestroy(): void { this.subscriptions.unsubscribe(); }

  goBack(): void {
    this.projectServ.showProjectDetails = false;
    this.projectServ.selectedSide.next(null);
    this.sideProject = null;
    this.deselectAll.emit();
    this.notifyApp.emit();
  }

  onMenuButtonClick(): void { this.toggleSidenav.emit(); }
}
