import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Book, PageType } from './book.types';
import { Asset } from '../../../../services/asset-manager.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  standalone: false,
})
export class BookComponent implements OnInit {
  @Input()
  pages?: Array<Asset>;

  windowWidth: number;
  frontImage = '';
  backImage = '';

  book?: Book;
  readyToRender = false;

  constructor() {
    this.windowWidth = window.innerWidth;
  }

  ngOnInit(): void {
    if (this.pages) {
      this.frontImage = this.pages[0].url;
      this.backImage = this.pages[this.pages.length - 1].url;
      this.book = {
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

      for (let i = 1; i < this.pages.length - 1; i++) {
        this.book.pages.push({
          imageUrl: this.pages[i].url,
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
