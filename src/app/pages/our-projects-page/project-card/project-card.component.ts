import { Component, Input } from '@angular/core';
import { Project } from '../our-projects-page.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  standalone: false,
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
