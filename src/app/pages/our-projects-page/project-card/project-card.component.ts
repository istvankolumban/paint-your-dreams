import { Component, Input } from '@angular/core';
import { ProjectModel } from '../our-projects.service';
import { AuthService } from '../../../auth/auth.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  standalone: false,
})
export class ProjectCardComponent {
  @Input() project!: ProjectModel;
  editedProject: ProjectModel;

  isLoggedIn = false;
  isEditing = false;
  isValid = true;
  projectForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.editedProject = {
      expanded: false,
      coverImage: '',
      title: '',
      year: 0,
      month: '',
      location: '',
      participants: '',
      organizers: [],
      description: '',
      images: [],
    };

    this.isLoggedIn = this.authService.isAuthenticated();
    const currentYear = new Date().getFullYear();
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      year: [currentYear],
      month: [''],
      location: [''],
      participants: [''],
      organizers: this.fb.array([], Validators.required),
      coverImage: ['', Validators.required],
      images: this.fb.array([]),
    });
  }

  get organizers(): FormArray {
    return this.projectForm.get('organizers') as FormArray;
  }

  get images(): FormArray {
    return this.projectForm.get('images') as FormArray;
  }

  setOrganizers(organizers: string[]) {
    const organizersFormArray = this.projectForm.get('organizers') as FormArray;
    organizersFormArray.clear();
    organizers.forEach((organizer) => {
      organizersFormArray.push(this.fb.control(organizer, Validators.required));
    });
  }

  setImages(images: string[]) {
    const imagesFormArray = this.projectForm.get('images') as FormArray;
    imagesFormArray.clear();
    images.forEach((image) => {
      imagesFormArray.push(this.fb.control(image, Validators.required));
    });
  }

  addOrganizer() {
    this.organizers.push(this.fb.control('', Validators.required));
  }

  removeOrganizer(index: number) {
    this.organizers.removeAt(index);
  }

  addImage() {
    this.images.push(this.fb.control('', Validators.required));
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

  editProject() {
    this.isEditing = true;
    this.isValid = false;
    this.projectForm.patchValue({
      title: this.project.title,
      description: this.project.description,
      year: this.project.year,
      month: this.project.month,
      location: this.project.location,
      participants: this.project.participants,
      coverImage: this.project.coverImage,
    });
    this.setOrganizers(this.project.organizers || []);
    this.setImages(this.project.images || []);
  }

  saveProject() {
    if (this.projectForm.valid) {
      this.isEditing = false;
      this.isValid = true;
      this.project.title = this.projectForm.value.title;
      this.project.description = this.projectForm.value.description;
      this.project.year = this.projectForm.value.year;
      this.project.month = this.projectForm.value.month;
      this.project.location = this.projectForm.value.location;
      this.project.participants = this.projectForm.value.participants;
      this.project.organizers = this.projectForm.value.organizers;
      this.project.coverImage = this.projectForm.value.coverImage;
      this.project.images = this.projectForm.value.images;
    } else {
      this.isValid = false;
    }
  }
}
