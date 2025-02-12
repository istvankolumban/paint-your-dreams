import { Component } from '@angular/core';
import { OurProjectsService, ProjectModel } from './our-projects.service';

@Component({
  selector: 'app-our-projects-page',
  templateUrl: './our-projects-page.component.html',
  styleUrls: ['./our-projects-page.component.scss'],
  standalone: false,
})
export class OurProjectsPageComponent {
  projects: Array<ProjectModel> = [];
  filteredProjects: Array<ProjectModel> = [];

  constructor(private ourProjectsService: OurProjectsService) {
    this.ourProjectsService.getProjects().subscribe((projects) => {
      
      this.projects = projects;
      this.filteredProjects = [...this.projects];
    });
  }

  filterProjectsBySearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProjects = this.projects.filter(
      (project) =>
        project.title.toLowerCase().includes(value) ||
        project.year.toString().toLowerCase().includes(value) ||
        project.month.toLowerCase().includes(value) ||
        project.location.toLowerCase().includes(value) ||
        project.participants.toLowerCase().includes(value) ||
        project.organizers.some((organizer) =>
          organizer.toLowerCase().includes(value)
        ) ||
        project.description.toLowerCase().includes(value)
    );
  }
}
