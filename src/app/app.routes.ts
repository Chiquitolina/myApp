import { Routes } from '@angular/router';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { PortfolioPageComponent } from './views/portfolio-page/portfolio-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'portfolio', component: PortfolioPageComponent },
  // La navegación interna a proyectos sigue gestionada por ProjectsService.
  { path: 'project/:id', component: PortfolioPageComponent },
  { path: '**', redirectTo: '' },
];
