import { Component } from '@angular/core';
import { BookDetailsModel } from '../../shared/book-details/book/book.types';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-our-writings-page',
  templateUrl: './our-writings-page.component.html',
  styleUrls: ['./our-writings-page.component.scss'],
  standalone: false,
})
export class OurWritingsPageComponent {
  milyenSzinLennelBook$: Observable<BookDetailsModel>;

  constructor(private bookService: BookService) {
    this.milyenSzinLennelBook$ = this.bookService.getMilyenSzinLennelBook();
  }
}
