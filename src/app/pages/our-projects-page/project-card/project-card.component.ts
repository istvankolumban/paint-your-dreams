import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectModel } from '../our-projects.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  standalone: false,
})
export class ProjectCardComponent {
  @Input() project!: ProjectModel;
  @Input() isChangingOrder = false;
  @Input() maxOrder!: number;
  @Output() editProject = new EventEmitter<ProjectModel>();
  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();

  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  onEditProject() {
    this.editProject.emit(this.project);
  }
}
