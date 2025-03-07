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
  isCreatingPublication = false;
  newPublication: PublicationDetailsModel | null = null;

  constructor(
    private ourWritingService: OurWritingsService,
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
    this.ourWritingService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  createBook() {
    if (this.isAuthenticated()) {
      this.isCreatingBook = true;
      this.newBook = this.ourWritingService.createDefaultBook();
    }
  }

  createPublication() {
    if (this.isAuthenticated()) {
      this.isCreatingPublication = true;
      this.newPublication = this.ourWritingService.createDefaultPublication();
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
      this.ourWritingService.deleteBook(bookId).subscribe(() => {
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
      return this.ourWritingService.updateBook(book.id, book);
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
    this.ourWritingService.updateBook(book.id, book).subscribe(() => {
      this.loadBooks();
    });
  }

  loadPublications() {
    this.ourWritingService.getPublications().subscribe((publications) => {
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
    if (confirm('Are you sure you want to save this publication?')) {
      if (this.isAuthenticated()) {
        this.ourWritingService
          .updatePublication(publication.id, publication)
          .subscribe(() => {
            this.isEditingPublication = false;
            this.editedPublication = null;
            this.loadPublications();
          });
      }
    }
  }

  onCreatePublication(publication: PublicationDetailsModel) {
    if (confirm('Are you sure you want to create this publication?')) {
      if (this.isAuthenticated()) {
        this.ourWritingService.createPublication(publication).subscribe(() => {
          this.isCreatingPublication = false;
          this.newPublication = null;
          this.loadPublications();
        });
      }
    }
  }

  onDeletePublication(publicationId: string) {
    if (
      this.isAuthenticated() &&
      confirm('Are you sure you want to delete this publication?')
    ) {
      this.ourWritingService.deletePublication(publicationId).subscribe(() => {
        this.publications = this.publications.filter(
          (publication) => publication.id !== publicationId
        );
        this.updatePublicationOrders();
      });
    }
  }

  moveUpPublication(index: number) {
    if (index > 0) {
      const temp = this.publications[index];
      this.publications[index] = this.publications[index - 1];
      this.publications[index - 1] = temp;
      this.updatePublicationOrders();
    }
  }

  moveDownPublication(index: number) {
    if (index < this.publications.length - 1) {
      const temp = this.publications[index];
      this.publications[index] = this.publications[index + 1];
      this.publications[index + 1] = temp;
      this.updatePublicationOrders();
    }
  }

  updatePublicationOrders() {
    this.publications.forEach((publication, index) => {
      publication.order = index;
    });
    const updateObservables = this.publications.map((publication, index) => {
      publication.order = index;
      return this.ourWritingService.updatePublication(
        publication.id,
        publication
      );
    });

    forkJoin(updateObservables).subscribe(() => {
      this.loadPublications();
    });
  }

  onCancelPublication() {
    this.isEditingPublication = false;
    this.isCreatingPublication = false;
    this.editedPublication = null;
  }

  onVisiblePublication(publication: PublicationDetailsModel) {
    publication.visible = !publication.visible;
    this.ourWritingService
      .updatePublication(publication.id, publication)
      .subscribe(() => {
        this.loadPublications();
      });
  }
}
