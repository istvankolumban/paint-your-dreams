import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  Query,
} from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';

import { BookDetailsModel } from '../shared/book-details/book/book.types';
import {
  BehaviorSubject,
  filter,
  forkJoin,
  from,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  storage = inject(Storage);
  firestore = inject(Firestore);
  private readonly COLLECTION_NAME = 'books';

  private booksSubject = new BehaviorSubject<BookDetailsModel[] | null>(null);
  books$ = this.booksSubject.asObservable();

  fetchBooks(): void {
    if (this.booksSubject.value) return; // Prevent duplicate API calls

    const itemCollection = collection(this.firestore, this.COLLECTION_NAME);
    collectionData<BookDetailsModel>(itemCollection as Query<BookDetailsModel>)
      .pipe(
        switchMap((books) => {
          if (!books.length) return of([]); // Handle empty collection case

          const booksWithAttachments$ = books.map((book) =>
            forkJoin({
              pages: book.pages
                ? forkJoin(book.pages.map((page) => this.getPageUrl(page)))
                : of([]),
              attachments: book.attachments
                ? forkJoin(
                    book.attachments.map((attachment) =>
                      this.getAttachmentUrl(attachment)
                    )
                  )
                : of([]),
            }).pipe(
              map(({ pages, attachments }) => ({ ...book, pages, attachments }))
            )
          );

          return forkJoin(booksWithAttachments$);
        })
      )
      .subscribe((books) => this.booksSubject.next(books));
  }

  getBooks(): Observable<BookDetailsModel[]> {
    if (!this.booksSubject.value) {
      this.fetchBooks();
    }
    return this.books$.pipe(
      filter((books): books is BookDetailsModel[] => books !== null)
    );
  }

  getMilyenSzinLennelBook(): Observable<BookDetailsModel> {
    return this.getBooks().pipe(map((books) => books[0]));
  }

  private getPageUrl(page: string): Observable<string> {
    const pathReference = ref(this.storage, page);
    return from(getDownloadURL(pathReference));
  }

  private getAttachmentUrl(attachment: {
    title: string;
    url: string;
  }): Observable<{ title: string; url: string }> {
    const pathReference = ref(this.storage, attachment.url);
    return from(getDownloadURL(pathReference)).pipe(
      map((url) => ({ ...attachment, url }))
    );
  }
}
