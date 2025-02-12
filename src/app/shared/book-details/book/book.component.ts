import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Book, PageType } from './book.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  standalone: false,
})
export class BookComponent implements OnInit {
  @Input()
  pages?: Array<string>;

  bookImages: string[] = [];
  windowWidth: number;
  frontImage = 'images/milyen-szin-lennel/borito_front.jpg';
  backImage = 'images/milyen-szin-lennel/borito_back.jpg';

  book?: Book;
  readyToRender = false;

  constructor() {
    this.windowWidth = window.innerWidth;
  }

  ngOnInit(): void {
    if (this.pages) {
      this.frontImage = this.pages[0];
      this.backImage = this.pages[this.pages.length - 1];
      this.book = {
        width: 1020,
        height: 520,
        zoom: 1,
        cover: {
          front: {
            imageUrl: this.pages[0],
          },
          back: {
            imageUrl: this.pages[this.pages.length - 1],
          },
        },
        pages: [],
        pageWidth: 500,
        pageHeight: 500,
        startPageType: PageType.Double,
        endPageType: PageType.Double,
      };

      for (let i = 1; i < this.pages.length - 1; i++) {
        this.book.pages.push({
          imageUrl: this.pages[i],
          backgroundColor: '#f0f0f0',
        });
      }
    }
    this.readyToRender = true;
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
