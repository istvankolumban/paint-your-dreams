import { inject, Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentReference,
  DocumentData,
} from '@angular/fire/firestore';
import { BookDetailsModel } from '../shared/book-details/book/book.types';
import {
  BehaviorSubject,
  filter,
  from,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class BookService {
  firestore = inject(Firestore);
  private readonly COLLECTION_NAME = 'books';
  private booksCount = 0;

  constructor(private authService: AuthService) {}

  private booksSubject = new BehaviorSubject<BookDetailsModel[] | null>(null);
  books$ = this.booksSubject.asObservable();

  private fetchBooksObservable(): Observable<void> {
    const itemCollection = collection(this.firestore, this.COLLECTION_NAME);
    return from(getDocs(itemCollection)).pipe(
      switchMap((querySnapshot) => {
        const books: BookDetailsModel[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<BookDetailsModel, 'id'>;
          books.push({ id: doc.id, ...data });
        });

        return of(books).pipe(
          map((books) => {
            // Order books by book.order
            books.sort((a, b) => a.order - b.order);
            this.booksCount = books.length;
            this.booksSubject.next(books);
          })
        );
      })
    );
  }

  getBooks(): Observable<BookDetailsModel[]> {
    if (!this.booksSubject.value) {
      this.fetchBooksObservable().subscribe();
    }
    return this.books$.pipe(
      filter((books): books is BookDetailsModel[] => books !== null)
    );
  }

  createBook(
    book: Omit<BookDetailsModel, 'id'>
  ): Observable<DocumentReference<DocumentData>> {
    if (this.authService.isAuthenticated()) {
      const itemCollection = collection(this.firestore, this.COLLECTION_NAME);
      book = { ...book, order: this.booksCount };
      return from(addDoc(itemCollection, { ...book })).pipe(
        switchMap((docRef) =>
          this.fetchBooksObservable().pipe(map(() => docRef))
        )
      );
    } else {
      return throwError(() => new Error('User not authenticated'));
    }
  }

  updateBook(bookId: string, book: BookDetailsModel): Observable<void> {
    if (this.authService.isAuthenticated()) {
      const bookDocRef = doc(
        this.firestore,
        `${this.COLLECTION_NAME}/${bookId}`
      );
      return from(updateDoc(bookDocRef, { ...book })).pipe(
        switchMap(() => this.fetchBooksObservable())
      );
    } else {
      return throwError(() => new Error('User not authenticated'));
    }
  }

  deleteBook(bookId: string): Observable<void> {
    if (this.authService.isAuthenticated()) {
      const bookDocRef = doc(
        this.firestore,
        `${this.COLLECTION_NAME}/${bookId}`
      );
      return from(deleteDoc(bookDocRef)).pipe(
        switchMap(() => this.fetchBooksObservable())
      );
    } else {
      return throwError(() => new Error('User not authenticated'));
    }
  }

  getMilyenSzinLennelBook(): Observable<BookDetailsModel | undefined> {
    const bookId = '8QDNH2Y627lm30R9YLyy';
    return this.getBooks().pipe(
      map((books) => books.find((book) => book.id === bookId))
    );
  }

  createDefaultBook(): BookDetailsModel {
    return {
      id: '',
      title: '',
      description: '',
      backgroundColor: '',
      color: '',
      attachments: [],
      pages: [],
      order: -1,
      forSale: false,
    };
  }
}
