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

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  firestore = inject(Firestore);
  private readonly CAROUSEL_COLLECTION_NAME = 'home-carousel';

  private carouselItemsSubject = new BehaviorSubject<
    CarouselItemModel[] | null
  >(null);
  carouselItems$ = this.carouselItemsSubject.asObservable();
  private carouselItemsCount = 0;

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
          console.log(doc.id);
          carouselItems.push({ ...data, id: doc.id });
        });

        console.log(carouselItems);
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

  deleteCarouselItem(itemId: string): Observable<void> {
    const itemDocRef = doc(this.firestore, `${this.CAROUSEL_COLLECTION_NAME}/${itemId}`);
    return from(deleteDoc(itemDocRef)).pipe(
      switchMap(() => this.fetchCarouselItemsObservable())
    );
  }
}
