import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OurProjectsComponent } from './our-projects/our-projects.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'our-projects', component: OurProjectsComponent },
  { path: 'contact', component: ContactComponent }
];
