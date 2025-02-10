import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { OurProjectsPageComponent } from './pages/our-projects-page/our-projects-page.component';
import { OurWritingsPageComponent } from './pages/our-writings-page/our-writings-page.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'our-projects-page', component: OurProjectsPageComponent },
  { path: 'our-writings-page', component: OurWritingsPageComponent },
  { path: 'login', component: AuthComponent },
];
