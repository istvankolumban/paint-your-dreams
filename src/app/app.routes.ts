import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OurProjectsComponent } from './our-projects/our-projects.component';
import { OurWritingsComponent } from './our-writings/our-writings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'our-projects', component: OurProjectsComponent },
  { path: 'our-writings', component: OurWritingsComponent },
];
