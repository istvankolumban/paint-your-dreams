import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  Query,
} from '@angular/fire/firestore';

import {
  Attachment,
  BookDetailsModel,
} from '../shared/book-details/book/book.types';
import {
  BehaviorSubject,
  filter,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Asset, AssetManagerService } from './asset-manager.service';

@Injectable({ providedIn: 'root' })
export class BookService {
  firestore = inject(Firestore);
  private readonly COLLECTION_NAME = 'books';

  private booksSubject = new BehaviorSubject<BookDetailsModel[] | null>(null);
  books$ = this.booksSubject.asObservable();

  constructor(private assetManagerService: AssetManagerService) {}

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
                ? forkJoin(
                    book.pages.map((page) =>
                      this.assetManagerService.getImageUrl(page)
                    )
                  )
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

  private getAttachmentUrl(attachment: Attachment): Observable<Attachment> {
    const asset = { name: attachment.title, url: attachment.url } as Asset;
    return this.assetManagerService
      .getAsset(asset)
      .pipe(map((asset) => ({ ...attachment, url: asset.url })));
  }
}
