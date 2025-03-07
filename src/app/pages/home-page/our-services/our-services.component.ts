import { Component, OnInit } from '@angular/core';
import { OurServicesService } from './our-services.service';

export interface OurService {
  id: string;
  image: string;
  title: string;
  description: string;
  order: number;
  visible: boolean;
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
    this.ourServicesService.addService(service).subscribe(() => {
      this.fetchServices();
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
    // Implement edit functionality
  }

  onDelete(service: OurService): void {
    // Implement delete functionality
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
}
