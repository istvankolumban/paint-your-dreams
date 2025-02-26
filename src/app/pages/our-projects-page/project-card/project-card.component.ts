import { Component, Input } from '@angular/core';
import { ProjectModel } from '../our-projects.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  standalone: false,
})
export class ProjectCardComponent {
  @Input() project!: ProjectModel;
}
