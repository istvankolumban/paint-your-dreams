import { Component, Input } from '@angular/core';
import { ProjectModel } from '../our-projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  standalone: false,
})
export class ProjectDetailsComponent {
  @Input() project!: ProjectModel;
}
