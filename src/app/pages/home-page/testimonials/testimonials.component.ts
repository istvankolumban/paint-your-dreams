import { Component, OnInit } from '@angular/core';
import { TestimonialsService, Testimonial } from './testimonials.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  standalone: false,
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [];

  constructor(
    private testimonialsService: TestimonialsService,
    private authService: AuthService
  ) {}

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.fetchTestimonials();
  }

  fetchTestimonials(): void {
    this.testimonialsService.fetchTestimonials().subscribe((testimonials) => {
      this.testimonials = testimonials;
    });
  }

  addTestimonial(testimonial: Testimonial): void {
    this.testimonialsService.addTestimonial(testimonial).subscribe((id) => {
      testimonial.id = id;
      this.updateTestimonial(testimonial);
    });
  }

  updateTestimonial(testimonial: Testimonial): void {
    this.testimonialsService.updateTestimonial(testimonial).subscribe(() => {
      this.fetchTestimonials();
    });
  }

  updateTestimonials(testimonials: Testimonial[]): void {
    this.testimonialsService.updateTestimonials(testimonials).subscribe(() => {
      this.fetchTestimonials();
    });
  }

  onEdit(testimonial: Testimonial): void {
    testimonial.isEditing = true;
  }

  onDelete(testimonial: Testimonial): void {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.testimonialsService.deleteTestimonial(testimonial.id).subscribe(() => {
        this.testimonials = this.testimonials.filter((t) => t.id !== testimonial.id);
        this.testimonials.forEach((t, i) => (t.order = i));
        this.updateTestimonials(this.testimonials);
      });
    }
  }

  onMoveUp(index: number): void {
    if (index > 0) {
      const temp = this.testimonials[index - 1];
      this.testimonials[index - 1] = this.testimonials[index];
      this.testimonials[index] = temp;
      this.testimonials.forEach((testimonial, i) => (testimonial.order = i));
      this.updateTestimonials(this.testimonials);
    }
  }

  onMoveDown(index: number): void {
    if (index < this.testimonials.length - 1) {
      const temp = this.testimonials[index + 1];
      this.testimonials[index + 1] = this.testimonials[index];
      this.testimonials[index] = temp;
      this.testimonials.forEach((testimonial, i) => (testimonial.order = i));
      this.updateTestimonials(this.testimonials);
    }
  }

  onVisible(index: number): void {
    this.testimonials[index].visible = !this.testimonials[index].visible;
    this.updateTestimonial(this.testimonials[index]);
  }

  onSave(testimonial: Testimonial): void {
    if (confirm('Are you sure you want to save changes?')) {
      testimonial.isEditing = false;
      if (!testimonial.id) {
        this.addTestimonial(testimonial);
      } else {
        this.updateTestimonial(testimonial);
      }
    }
  }

  onCancel(testimonial: Testimonial): void {
    testimonial.isEditing = false;
    this.fetchTestimonials();
  }

  onAddNewTestimonial(): void {
    const newTestimonial: Testimonial = {
      id: '',
      title: '',
      content: '',
      author: '',
      link: '',
      image: '',
      expanded: false,
      visible: false,
      order: this.testimonials.length,
      isEditing: true,
    };
    this.testimonials.unshift(newTestimonial);
  }

  onImageSelected(testimonial: Testimonial, asset: any): void {
    testimonial.image = asset.url;
  }
}
