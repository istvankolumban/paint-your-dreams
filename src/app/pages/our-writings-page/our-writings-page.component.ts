import { Component, OnInit } from '@angular/core';
import {
  BookDetailsModel,
  OurWritingsService,
  PublicationDetailsModel,
} from './our-writings.service';
import { AuthService } from '../../auth/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-our-writings-page',
  templateUrl: './our-writings-page.component.html',
  styleUrls: ['./our-writings-page.component.scss'],
  standalone: false,
})
export class OurWritingsPageComponent implements OnInit {
  books: BookDetailsModel[] = [];
  publications: PublicationDetailsModel[] = [];
  isCreatingBook = false;
  isEditingBook = false;
  newBook: BookDetailsModel | null = null;
  editedBook: BookDetailsModel | null = null;
  isEditingPublication = false;
  editedPublication: PublicationDetailsModel | null = null;

  constructor(
    private bookService: OurWritingsService,
    private publicationService: OurWritingsService,
    private authService: AuthService
  ) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.loadBooks();
    this.loadPublications();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  createBook() {
    if (this.isAuthenticated()) {
      this.isCreatingBook = true;
      this.newBook = this.bookService.createDefaultBook();
    }
  }

  editBook(book: BookDetailsModel) {
    if (this.isAuthenticated()) {
      this.isEditingBook = true;
      this.editedBook = book;
    }
  }

  onBookSaved() {
    if (confirm('Are you sure you want to save this book?')) {
      this.isCreatingBook = false;
      this.isEditingBook = false;
      this.newBook = null;
      this.editedBook = null;
      this.loadBooks();
    }
  }

  deleteBook(bookId: string) {
    if (
      this.isAuthenticated() &&
      confirm('Are you sure you want to delete this book?')
    ) {
      this.bookService.deleteBook(bookId).subscribe(() => {
        this.books = this.books.filter((book) => book.id !== bookId);
        this.updateBookOrders();
      });
    }
  }

  moveUpBook(index: number) {
    if (index > 0) {
      const temp = this.books[index];
      this.books[index] = this.books[index - 1];
      this.books[index - 1] = temp;
      this.updateBookOrders();
    }
  }

  moveDownBook(index: number) {
    if (index < this.books.length - 1) {
      const temp = this.books[index];
      this.books[index] = this.books[index + 1];
      this.books[index + 1] = temp;
      this.updateBookOrders();
    }
  }

  updateBookOrders() {
    this.books.forEach((book, index) => {
      book.order = index;
    });
    const updateObservables = this.books.map((book, index) => {
      book.order = index;
      return this.bookService.updateBook(book.id, book);
    });

    forkJoin(updateObservables).subscribe(() => {
      this.loadBooks();
    });
  }

  onEditBookCanceled() {
    this.isCreatingBook = false;
    this.isEditingBook = false;
    this.newBook = null;
    this.editedBook = null;
  }

  onVisibleBook(book: BookDetailsModel) {
    book.visible = !book.visible;
    this.bookService.updateBook(book.id, book).subscribe(() => {
      this.loadBooks();
    });
  }

  loadPublications() {
    this.publicationService.getPublications().subscribe((publications) => {
      this.publications = publications;
    });
  }

  onEditPublication(publication: PublicationDetailsModel) {
    if (this.isAuthenticated()) {
      this.isEditingPublication = true;
      this.editedPublication = publication;
    }
  }

  onSavePublication(publication: PublicationDetailsModel) {
    if (this.isAuthenticated()) {
      this.publicationService
        .updatePublication(publication.id, publication)
        .subscribe(() => {
          this.isEditingPublication = false;
          this.editedPublication = null;
          this.loadPublications();
        });
    }
  }

  onCancelPublication() {
    this.isEditingPublication = false;
    this.editedPublication = null;
  }
}
