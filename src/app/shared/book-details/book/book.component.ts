import { Component, HostListener } from '@angular/core';
import { Book, PageType } from './book.types';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  standalone: false,
})
export class BookComponent {
  bookImages: string[];
  windowWidth: number;
  frontImage = 'images/milyen-szin-lennel/borito_front.jpg';
  backImage = 'images/milyen-szin-lennel/borito_back.jpg';

  book: Book = {
    width: 1020,
    height: 520,
    zoom: 1,
    cover: {
      front: {
        imageUrl: this.frontImage,
      },
      back: {
        imageUrl: this.backImage,
      },
    },
    pages: [],
    pageWidth: 500,
    pageHeight: 500,
    startPageType: PageType.Double,
    endPageType: PageType.Double,
  };

  constructor() {
    this.bookImages = [];
    for (let i = 1; i <= 18; i++) {
      this.bookImages.push(`images/milyen-szin-lennel/page${i}.jpg`);
    }
    this.windowWidth = window.innerWidth;

    for (let i = 0; i < this.bookImages.length; i++) {
      this.book.pages.push({
        imageUrl: this.bookImages[i],
        backgroundColor: '#f0f0f0',
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const newWidth = event.target.innerWidth;
    if (
      (this.windowWidth < 1200 && newWidth >= 1200) ||
      (this.windowWidth >= 1200 && newWidth < 1200)
    ) {
      this.windowWidth = newWidth;
    }
  }
}
