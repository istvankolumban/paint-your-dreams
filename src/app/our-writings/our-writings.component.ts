import { Component } from '@angular/core';
import { BookComponent } from '../book/book.types';
import { BookService } from '../book.service';

@Component({
  selector: 'app-our-writings',
  templateUrl: './our-writings.component.html',
  styleUrl: './our-writings.component.scss',
  standalone: false,
})
export class OurWritingsComponent {
  milyenSzinLennelBook: BookComponent;

  constructor(private readonly bookService: BookService) {
    this.milyenSzinLennelBook = this.bookService.getMilyenSzinLennelBook();
  }
}
