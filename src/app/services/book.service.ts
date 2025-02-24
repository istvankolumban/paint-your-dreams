import { inject, Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

import { BookDetailsModel } from '../shared/book-details/book/book.types';
import {
  BehaviorSubject,
  filter,
  from,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  firestore = inject(Firestore);
  private readonly COLLECTION_NAME = 'books';

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
            // Update projects count
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

  getMilyenSzinLennelBook(): Observable<BookDetailsModel> {
    return this.getBooks().pipe(map((books) => books[0]));
  }
}
