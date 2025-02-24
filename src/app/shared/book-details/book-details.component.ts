import { Component, Input, OnInit } from '@angular/core';
import { Attachment, BookDetailsModel } from './book/book.types';
import { Observable } from 'rxjs';
import { Asset } from '../../services/asset-manager.service';

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
  pages?: Array<Asset>;

  ngOnInit(): void {
    this.book$?.subscribe((book) => {
      this.attachments = book.attachments
        ? book.attachments.map((attachment) => ({
            title: attachment.name,
            url: attachment.url,
          }))
        : [];
      this.pages = book.pages ? book.pages : [];
    });
  }

  onOrderNowClick() {
    const modal = document.getElementById('orderModal');
    if (modal !== null) {
      modal.style.display = 'block';
    }
  }
}
