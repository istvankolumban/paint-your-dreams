import { Component } from '@angular/core';
import { BookDetailsModel } from '../../shared/book-details/book/book.types';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-our-writings-page',
  templateUrl: './our-writings-page.component.html',
  styleUrl: './our-writings-page.component.scss',
  standalone: false,
})
export class OurWritingsPageComponent {
  milyenSzinLennelBook: BookDetailsModel;

  constructor(private readonly bookService: BookService) {
    this.milyenSzinLennelBook = this.bookService.getMilyenSzinLennelBook();
  }
}
