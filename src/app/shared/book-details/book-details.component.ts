import { Component, Input } from '@angular/core';
import { BookDetailsModel } from './book/book.types';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
  standalone: false,
})
export class BookDetailsComponent {
  @Input()
  showAttachments = false;

  @Input()
  showOrderButton = false;

  @Input()
  book?: BookDetailsModel;

  onOrderNowClick() {
    const modal = document.getElementById('orderModal');
    if (modal !== null) {
      modal.style.display = 'block';
    }
  }
}
