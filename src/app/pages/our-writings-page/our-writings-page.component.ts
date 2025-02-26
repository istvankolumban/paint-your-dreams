import { Component, OnInit } from '@angular/core';
import { BookDetailsModel } from '../../shared/book-details/book/book.types';
import { BookService } from '../../services/book.service';
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
  isCreating = false;
  isEditing = false;
  newBook: BookDetailsModel | null = null;
  editedBook: BookDetailsModel | null = null;
  isChangingOrder = false;

  constructor(
    private bookService: BookService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  createBook() {
    if (this.isAuthenticated()) {
      this.isCreating = true;
      this.newBook = this.bookService.createDefaultBook();
    }
  }

  editBook(book: BookDetailsModel) {
    if (this.isAuthenticated()) {
      this.isEditing = true;
      this.editedBook = book;
    }
  }

  onBookSaved() {
    this.isCreating = false;
    this.isEditing = false;
    this.newBook = null;
    this.editedBook = null;
    this.loadBooks();
  }

  deleteBook(bookId: string) {
    if (this.isAuthenticated()) {
      this.bookService.deleteBook(bookId).subscribe(() => {
        this.books = this.books.filter((book) => book.id !== bookId);
        this.updateBookOrders();
        this.saveOrder();
      });
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  startChangingOrder() {
    this.isChangingOrder = true;
  }

  saveOrder() {
    const updateObservables = this.books.map((book, index) => {
      book.order = index;
      return this.bookService.updateBook(book.id, book);
    });

    forkJoin(updateObservables).subscribe(() => {
      this.isChangingOrder = false;
      this.loadBooks();
    });
  }

  moveUp(index: number) {
    if (index > 0) {
      const temp = this.books[index];
      this.books[index] = this.books[index - 1];
      this.books[index - 1] = temp;
      this.updateBookOrders();
    }
  }

  moveDown(index: number) {
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
  }
}
