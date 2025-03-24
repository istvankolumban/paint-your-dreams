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
import { AuthService } from '../../auth/auth.service';
import { Asset } from '../../services/asset-manager.service';

export interface BookDetailsModel {
  id: string;
  title: string;
  description: string;
  color?: string;
  backgroundColor?: string;
  attachments: Array<Asset>;
  pages: Array<Asset>;
  order: number;
  forSale: boolean;
  visible: boolean;
}

export interface PublicationDetailsModel {
  id: string;
  title: string;
  description: string;
  date: string;
  attachment: Asset;
  authors: string;
  order: number;
  visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class OurWritingsService {
  firestore = inject(Firestore);
  private readonly BOOK_COLLECTION = 'books';
  private readonly PUBLICATION_COLLECTION = 'publications';

  private booksSubject = new BehaviorSubject<BookDetailsModel[] | null>(null);
  private books$ = this.booksSubject.asObservable();
  private booksCount = 0;

  private publicationsSubject = new BehaviorSubject<
    PublicationDetailsModel[] | null
  >(null);
  private publications$ = this.publicationsSubject.asObservable();
  private publicationsCount = 0;

  constructor(private authService: AuthService) {}

  private fetchBooksObservable(): Observable<void> {
    const itemCollection = collection(this.firestore, this.BOOK_COLLECTION);
    return from(getDocs(itemCollection)).pipe(
      switchMap((querySnapshot) => {
        const books: BookDetailsModel[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<BookDetailsModel, 'id'>;
          books.push({ ...data, id: doc.id });
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
      const itemCollection = collection(this.firestore, this.BOOK_COLLECTION);
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
        `${this.BOOK_COLLECTION}/${bookId}`
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
        `${this.BOOK_COLLECTION}/${bookId}`
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
      visible: false,
    };
  }

  private fetchPublicationsObservable(): Observable<void> {
    const itemCollection = collection(
      this.firestore,
      this.PUBLICATION_COLLECTION
    );
    return from(getDocs(itemCollection)).pipe(
      switchMap((querySnapshot) => {
        const publications: PublicationDetailsModel[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<PublicationDetailsModel, 'id'>;
          publications.push({ id: doc.id, ...data });
        });

        return of(publications).pipe(
          map((publications) => {
            // Order publications by publication.order
            publications.sort((a, b) => a.order - b.order);
            this.publicationsCount = publications.length;
            this.publicationsSubject.next(publications);
          })
        );
      })
    );
  }

  getPublications(): Observable<PublicationDetailsModel[]> {
    if (!this.publicationsSubject.value) {
      this.fetchPublicationsObservable().subscribe();
    }
    return this.publications$.pipe(
      filter((books): books is PublicationDetailsModel[] => books !== null)
    );
  }

  createPublication(
    publication: PublicationDetailsModel
  ): Observable<DocumentReference<DocumentData>> {
    if (this.authService.isAuthenticated()) {
      const itemCollection = collection(
        this.firestore,
        this.PUBLICATION_COLLECTION
      );
      const { id, ...publicationData } = publication; // Exclude the id attribute
      publicationData.order = this.publicationsCount;
      return from(addDoc(itemCollection, { ...publicationData })).pipe(
        switchMap((docRef) =>
          this.fetchPublicationsObservable().pipe(map(() => docRef))
        )
      );
    } else {
      return throwError(() => new Error('User not authenticated'));
    }
  }

  updatePublication(
    publicationId: string,
    publication: PublicationDetailsModel
  ): Observable<void> {
    if (this.authService.isAuthenticated()) {
      const publicationDocRef = doc(
        this.firestore,
        `${this.PUBLICATION_COLLECTION}/${publicationId}`
      );
      return from(updateDoc(publicationDocRef, { ...publication })).pipe(
        switchMap(() => this.fetchPublicationsObservable())
      );
    } else {
      return throwError(() => new Error('User not authenticated'));
    }
  }

  deletePublication(publicationId: string): Observable<void> {
    if (this.authService.isAuthenticated()) {
      const publicationDocRef = doc(
        this.firestore,
        `${this.PUBLICATION_COLLECTION}/${publicationId}`
      );
      return from(deleteDoc(publicationDocRef)).pipe(
        switchMap(() => this.fetchPublicationsObservable())
      );
    } else {
      return throwError(() => new Error('User not authenticated'));
    }
  }

  createDefaultPublication(): PublicationDetailsModel {
    return {
      id: '',
      title: '',
      description: '',
      date: '',
      attachment: {
        name: '',
        url: '',
      },
      authors: '',
      order: -1,
      visible: false,
    };
  }
}
