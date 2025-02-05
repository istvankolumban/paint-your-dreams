import { Component } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  standalone: false,
})
export class BookComponent {
  book: Book = {
    width: 1190,
    height: 800,
    zoom: 1,
    cover: {
      front: {
        imageUrl: 'images/milyen-szin-lennel/borito-0001.jpg',
      },
      back: {
        imageUrl: 'images/milyen-szin-lennel/borito-0001.jpg',
      },
    },
    pages: [
      {
        imageUrl: 'images/milyen-szin-lennel/1-fejezet_page-0001_left.jpg',
        backgroundColor: '#f0f0f0',
      },
      {
        imageUrl: 'images/milyen-szin-lennel/1-fejezet_page-0001_right.jpg',
        backgroundColor: '#f0f0f0',
      },
      {
        imageUrl: 'images/milyen-szin-lennel/1-fejezet_page-0002_left.jpg',
        backgroundColor: '#f0f0f0',
      },
      {
        imageUrl: 'images/milyen-szin-lennel/1-fejezet_page-0002_right.jpg',
        backgroundColor: '#f0f0f0',
      },
    ],
    pageWidth: 585,
    pageHeight: 780,
    startPageType: PageType.Double,
    endPageType: PageType.Double,
  };
}

interface Cover {
  front: BookPageSide;
  back: BookPageSide;
}

enum PageType {
  Single,
  Double,
}

interface BookPageSide {
  imageUrl: string;
  backgroundColor?: string;
  opacity?: number;
}

interface Book {
  width: number;
  height: number;
  zoom: number;
  cover?: Cover;
  pages: BookPageSide[];
  pageWidth?: number;
  pageHeight?: number;
  startPageType?: PageType;
  endPageType?: PageType;
}
