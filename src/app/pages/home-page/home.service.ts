import { inject, Injectable } from '@angular/core';
import { Asset } from '../../services/asset-manager.service';
import {
  collection,
  Firestore,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from '@angular/fire/firestore';
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
import { AuthService } from '../../auth/auth.service';

export interface CarouselItemModel {
  id: string;
  image: Asset;
  text: string;
  order: number;
  visible: boolean;
}

export interface HomeAboutTextModel {
  id: string;
  text: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  firestore = inject(Firestore);
  private readonly CAROUSEL_COLLECTION_NAME = 'home-carousel';
  private readonly ABOUT_COLLECTION_NAME = 'home-about';

  private carouselItemsSubject = new BehaviorSubject<
    CarouselItemModel[] | null
  >(null);
  carouselItems$ = this.carouselItemsSubject.asObservable();
  private carouselItemsCount = 0;

  private aboutTextSubject = new BehaviorSubject<HomeAboutTextModel | null>(null);
  aboutText$ = this.aboutTextSubject.asObservable();

  constructor(private authService: AuthService) { }

  private fetchCarouselItemsObservable(): Observable<void> {
    const itemCollection = collection(
      this.firestore,
      this.CAROUSEL_COLLECTION_NAME
    );
    return from(getDocs(itemCollection)).pipe(
      switchMap((querySnapshot) => {
        const carouselItems: CarouselItemModel[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<CarouselItemModel, 'id'>;
          carouselItems.push({ ...data, id: doc.id });
        });

        return of(carouselItems).pipe(
          map((carouselItems) => {
            // Order books by book.order
            carouselItems.sort((a, b) => a.order - b.order);
            this.carouselItemsCount = carouselItems.length;
            this.carouselItemsSubject.next(carouselItems);
          })
        );
      })
    );
  }

  private fetchAboutTextObservable(): Observable<void> {
    const aboutCollection = collection(this.firestore, this.ABOUT_COLLECTION_NAME);
    return from(getDocs(aboutCollection)).pipe(
      switchMap((querySnapshot) => {
        const aboutTexts: HomeAboutTextModel[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<HomeAboutTextModel, 'id'>;
          aboutTexts.push({ ...data, id: doc.id });
        });

        return of(aboutTexts[0]).pipe(
          map((aboutText) => {
            this.aboutTextSubject.next(aboutText);
          })
        );
      })
    );
  }

  getCarouselItems(): Observable<CarouselItemModel[]> {
    if (!this.carouselItemsSubject.value) {
      this.fetchCarouselItemsObservable().subscribe();
    }
    return this.carouselItems$.pipe(
      filter(
        (carouselItems): carouselItems is CarouselItemModel[] =>
          carouselItems !== null
      )
    );
  }

  getAboutText(): Observable<HomeAboutTextModel> {
    if (!this.aboutTextSubject.value) {
      this.fetchAboutTextObservable().subscribe();
    }
    return this.aboutText$.pipe(
      filter(
        (aboutText): aboutText is HomeAboutTextModel =>
          aboutText !== null
      )
    );
  }

  updateCarouselItems(items: CarouselItemModel[]): Observable<void> {
    const updateObservables = items.map((item) => {
      if (item.id) {
        // Update existing item
        const itemDocRef = doc(
          this.firestore,
          `${this.CAROUSEL_COLLECTION_NAME}/${item.id}`
        );
        return from(updateDoc(itemDocRef, { ...item }));
      } else {
        // Create new item
        const itemCollection = collection(this.firestore, this.CAROUSEL_COLLECTION_NAME);
        return from(addDoc(itemCollection, { ...item })).pipe(
          map((docRef) => {
            item.id = docRef.id;
          })
        );
      }
    });

    return forkJoin(updateObservables).pipe(
      switchMap(() => this.fetchCarouselItemsObservable())
    );
  }

  updateAboutText(aboutText: HomeAboutTextModel): Observable<void> {
    if (aboutText.id) {
      // Update existing about text
      const aboutDocRef = doc(this.firestore, `${this.ABOUT_COLLECTION_NAME}/${aboutText.id}`);
      return from(updateDoc(aboutDocRef, { ...aboutText })).pipe(
        switchMap(() => this.fetchAboutTextObservable())
      );
    } else {
      // Create new about text
      const aboutCollection = collection(this.firestore, this.ABOUT_COLLECTION_NAME);
      return from(addDoc(aboutCollection, { ...aboutText })).pipe(
        map((docRef) => {
          aboutText.id = docRef.id;
        }),
        switchMap(() => this.fetchAboutTextObservable())
      );
    }
  }

  deleteCarouselItem(itemId: string): Observable<void> {
    const itemDocRef = doc(this.firestore, `${this.CAROUSEL_COLLECTION_NAME}/${itemId}`);
    return from(deleteDoc(itemDocRef)).pipe(
      switchMap(() => this.fetchCarouselItemsObservable())
    );
  }
}
