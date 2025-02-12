import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Attachment, BookDetailsModel } from './book/book.types';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  standalone: false,
})
export class BookDetailsComponent implements OnInit {
  @Input()
  showAttachments = false;

  @Input()
  showOrderButton = false;

  @Input()
  book$?: Observable<BookDetailsModel>;

  attachments?: Array<Attachment>;
  pages?: Array<string>;

  ngOnInit(): void {
    this.book$?.subscribe((book) => {
      this.attachments = book.attachments ? book.attachments : [];
      this.pages = book.pages ? book.pages : [];
      console.log(this.pages)
    });
  }

  onOrderNowClick() {
    const modal = document.getElementById('orderModal');
    if (modal !== null) {
      modal.style.display = 'block';
    }
  }
}
