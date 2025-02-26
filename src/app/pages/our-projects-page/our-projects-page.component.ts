import { Component } from '@angular/core';
import { OurProjectsService, ProjectModel } from './our-projects.service';
import { AuthService } from '../../auth/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-our-projects-page',
  templateUrl: './our-projects-page.component.html',
  styleUrls: ['./our-projects-page.component.scss'],
  standalone: false,
})
export class OurProjectsPageComponent {
  projects: Array<ProjectModel> = [];
  filteredProjects: Array<ProjectModel> = [];
  isCreating = false;
  isEditing = false;
  newProject: ProjectModel | null = null;
  editedProject: ProjectModel | null = null;
  searchValue = '';

  constructor(
    private ourProjectsService: OurProjectsService,
    private authService: AuthService
  ) {
    this.ourProjectsService.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.filteredProjects = [...this.projects];
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  filterProjectsBySearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchValue = value;
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

  moveUp(index: number) {
    if (index > 0) {
      const temp = this.projects[index];
      this.projects[index] = this.projects[index - 1];
      this.projects[index - 1] = temp;
      this.updateProjectOrders();
    }
  }

  moveDown(index: number) {
    if (index < this.projects.length - 1) {
      const temp = this.projects[index];
      this.projects[index] = this.projects[index + 1];
      this.projects[index + 1] = temp;
      this.updateProjectOrders();
    }
  }

  updateProjectOrders() {
    this.projects.forEach((project, index) => {
      project.order = index;
    });
    this.filteredProjects = [...this.projects];
    const updateObservables = this.projects.map((project, index) => {
      project.order = index;
      return this.ourProjectsService.updateProject(project.id, project);
    });

    forkJoin(updateObservables).subscribe(() => {
      this.ourProjectsService.fetchProjects();
    });
  }

  deleteProject(id: string) {
    this.ourProjectsService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter((project) => project.id !== id);
      this.updateProjectOrders();
      this.filteredProjects = [...this.projects];
    });
  }
}
