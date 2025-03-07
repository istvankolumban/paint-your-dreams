import { Component, OnInit } from '@angular/core';
import { CarouselItemModel } from '../home.service';
import { HomeService } from '../home.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss']
})
export class HomeCarouselComponent implements OnInit {
  carouselItems: CarouselItemModel[] = [];
  isEditingCarousel = false;

  constructor(
    private homeService: HomeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.homeService.getCarouselItems().subscribe((items) => {
      this.carouselItems = items;
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onEditCarousel(): void {
    this.isEditingCarousel = true;
  }

  onCarouselItemSaved(items: CarouselItemModel[]): void {
    this.homeService.updateCarouselItems(items).subscribe(() => {
      this.carouselItems = items;
      this.isEditingCarousel = false;
    });
  }
}
