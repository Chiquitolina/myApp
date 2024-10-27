import { Routes } from '@angular/router';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { ProjectViewComponent } from './views/project-view/project-view.component';

export const routes: Routes = [
    { path: '', component: HomeViewComponent },
    { path: 'project/:id', component: ProjectViewComponent}
];
