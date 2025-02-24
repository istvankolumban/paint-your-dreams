import { Component, OnInit } from '@angular/core';
import { BookDetailsModel } from '../../shared/book-details/book/book.types';
import { BookService } from '../../services/book.service';

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

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  createBook() {
    this.isCreating = true;
    this.newBook = { id: '', title: '', description: '', attachments: [], pages: [] };
  }

  editBook(book: BookDetailsModel) {
    this.isEditing = true;
    this.editedBook = book;
  }

  onBookSaved() {
    this.isCreating = false;
    this.isEditing = false;
    this.newBook = null;
    this.editedBook = null;
    this.loadBooks();
  }

  deleteBook(bookId: string) {
    this.bookService.deleteBook(bookId).subscribe(() => {
      this.books = this.books.filter((book) => book.id !== bookId);
    });
  }
}
