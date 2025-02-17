import { Component } from '@angular/core';
import { OurProjectsService, ProjectModel } from './our-projects.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-our-projects-page',
  templateUrl: './our-projects-page.component.html',
  styleUrls: ['./our-projects-page.component.scss'],
  standalone: false,
})
export class OurProjectsPageComponent {
  projects: Array<ProjectModel> = [];
  filteredProjects: Array<ProjectModel> = [];
  isLoggedIn = false;
  isCreating = false;
  isEditing = false;
  newProject: ProjectModel | null = null;
  editedProject: ProjectModel | null = null;

  constructor(
    private ourProjectsService: OurProjectsService,
    private authService: AuthService
  ) {
    this.isLoggedIn = this.authService.isAuthenticated();
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

  createProject() {
    this.isCreating = true;
    this.newProject = this.ourProjectsService.createDefaultProject();
  }

  editProject(project: ProjectModel) {
    this.isEditing = true;
    this.editedProject = project;
  }

  onProjectCreated() {
    this.isCreating = false;
    this.newProject = null;
    this.ourProjectsService.fetchProjects();
  }

  onProjectUpdated() {
    this.isEditing = false;
    this.editedProject = null;
    this.ourProjectsService.fetchProjects();
  }
}
