import { Component, OnInit } from '@angular/core';
import { OurServicesService } from './our-services.service';

export interface OurService {
  id: string;
  image: string;
  title: string;
  description: string;
  order: number;
  visible: boolean;
  isEditing?: boolean;
}

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
  standalone: false,
})
export class OurServicesComponent implements OnInit {
  ourServices: OurService[] = [];

  constructor(private ourServicesService: OurServicesService) {}

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices(): void {
    this.ourServicesService.fetchServices().subscribe((services) => {
      this.ourServices = services;
    });
  }

  addService(service: OurService): void {
    this.ourServicesService.addService(service).subscribe((id) => {
      service.id = id;
      this.updateService(service);
    });
  }

  updateService(service: OurService): void {
    this.ourServicesService.updateService(service).subscribe(() => {
      this.fetchServices();
    });
  }

  updateServices(services: OurService[]): void {
    this.ourServicesService.updateServices(services).subscribe(() => {
      this.fetchServices();
    });
  }

  onEdit(service: OurService): void {
    service.isEditing = true;
  }

  onDelete(service: OurService): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.ourServicesService.deleteService(service.id).subscribe(() => {
        this.ourServices = this.ourServices.filter(s => s.id !== service.id);
        this.ourServices.forEach((s, i) => s.order = i);
        this.updateServices(this.ourServices);
      });
    }
  }

  onMoveUp(index: number): void {
    if (index > 0) {
      const temp = this.ourServices[index - 1];
      this.ourServices[index - 1] = this.ourServices[index];
      this.ourServices[index] = temp;
      this.ourServices.forEach((service, i) => service.order = i);
      this.updateServices(this.ourServices);
    }
  }

  onMoveDown(index: number): void {
    if (index < this.ourServices.length - 1) {
      const temp = this.ourServices[index + 1];
      this.ourServices[index + 1] = this.ourServices[index];
      this.ourServices[index] = temp;
      this.ourServices.forEach((service, i) => service.order = i);
      this.updateServices(this.ourServices);
    }
  }

  onVisible(index: number): void {
    this.ourServices[index].visible = !this.ourServices[index].visible;
    this.updateService(this.ourServices[index]);
  }

  onSave(service: OurService): void {
    if (confirm('Are you sure you want to save changes?')) {
      service.isEditing = false;
      if (!service.id) {
        this.addService(service);
      } else {
        this.updateService(service);
      }
    }
  }

  onCancel(service: OurService): void {
    service.isEditing = false;
    this.fetchServices();
  }

  onAddNewService(): void {
    const newService: OurService = {
      id: '',
      image: '',
      title: '',
      description: '',
      order: this.ourServices.length,
      visible: true,
      isEditing: true
    };
    this.ourServices.unshift(newService);
  }

  onImageSelected(service: OurService, asset: any): void {
    service.image = asset.url;
  }
}
