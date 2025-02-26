import { Component, Input, OnInit } from '@angular/core';
import { Attachment } from './book/book.types';
import { Asset } from '../../../services/asset-manager.service';
import { BookDetailsModel } from '../our-writings.service';
import { AuthService } from '../../../auth/auth.service';

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
  book?: BookDetailsModel;

  attachments?: Array<Attachment>;
  pages?: Array<Asset>;

  constructor(private authService: AuthService) {}

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    if (this.book) {
      this.attachments = this.book.attachments
        ? this.book.attachments.map((attachment: Asset) => ({
            title: attachment.name,
            url: attachment.url,
          }))
        : [];
      this.pages = this.book.pages ? this.book.pages : [];
    }
  }

  onOrderNowClick() {
    const modal = document.getElementById('orderModal');
    if (modal !== null) {
      modal.style.display = 'block';
    }
  }
}
