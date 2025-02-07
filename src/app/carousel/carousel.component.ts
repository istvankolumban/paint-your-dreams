import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: false,
})
export class CarouselComponent {
  carouselImages = [
    'images/home_carousel_1.jpg',
    'images/home_carousel_2.jpg',
    'images/home_carousel_3.jpg',
    'images/home_carousel_4.jpg',
    'images/home_carousel_5.jpg',
  ];
}
