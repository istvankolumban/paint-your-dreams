import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProjectModel } from '../our-projects.service';
import { OurProjectsService } from '../our-projects.service';
import { Asset } from '../../../services/asset-manager.service';

@Component({
  selector: 'app-project-card-edit',
  templateUrl: './project-card-edit.component.html',
  styleUrls: ['./project-card-edit.component.scss']
})
export class ProjectCardEditComponent {
  @Input() project!: ProjectModel;
  @Output() projectSaved = new EventEmitter<void>();
  projectForm: FormGroup;
  isValid = true;

  constructor(
    private fb: FormBuilder,
    private ourProjectsService: OurProjectsService
  ) {
    const currentYear = new Date().getFullYear();
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      year: [currentYear],
      month: [''],
      location: [''],
      participants: [''],
      organizers: this.fb.array([], Validators.required),
      coverImage: '',
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

  addImage(): void {
    this.images.push(this.fb.control(''));
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  addImageWithUrl(url: string): void {
    this.images.push(this.fb.control(url, Validators.required));
  }

  ngOnInit() {
    if (this.project) {
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
  }

  onCoverImageSelected(coverImage: Asset): void {
    this.projectForm.patchValue({ coverImage: coverImage.url });
  }

  onImageSelected(image: Asset): void {
    this.addImageWithUrl(image.url);
  }

  saveProject() {
    if (this.projectForm.valid) {
      const projectData: Omit<ProjectModel, 'id'> = {
        expanded: false,
        title: this.projectForm.value.title,
        description: this.projectForm.value.description,
        year: this.projectForm.value.year,
        month: this.projectForm.value.month,
        location: this.projectForm.value.location,
        participants: this.projectForm.value.participants,
        organizers: this.projectForm.value.organizers,
        coverImage: this.projectForm.value.coverImage,
        images: this.projectForm.value.images,
      };

      if (this.project.id) {
        this.ourProjectsService.updateProject(this.project.id, { ...projectData, id: this.project.id }).subscribe({
          next: () => {
            console.log('Project updated successfully');
            this.projectSaved.emit();
          },
          error: (err) => console.error('Error updating project:', err),
        });
      } else {
        this.ourProjectsService.createProject(projectData).subscribe({
          next: (docRef) => {
            console.log('Project created successfully with ID:', docRef.id);
            this.projectSaved.emit();
          },
          error: (err) => console.error('Error creating project:', err),
        });
      }
    } else {
      this.isValid = false;
    }
  }
}
