import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  Query,
} from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';

import { BookDetailsModel } from '../shared/book-details/book/book.types';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  storage = inject(Storage);
  firestore = inject(Firestore);
  private readonly COLLECTION_NAME = 'books';

  private books$: Observable<Array<BookDetailsModel>>;

  // private readonly books = Array<BookDetailsModel>({
  //   title:
  //     'Milyen szín lennél? Önismeretet segítő, kreatív gyakorlatok gyűjteménye',
  //   description:
  //     'Ha önfejlesztésre vágysz és nyitott vagy az újszerű önkifejezést segítő módszerekre akkor ez a könyv neked szól. A gyakorlatgyűjtemény alkotásra és önismereti munkára hív. Olyan kreatív gyakorlatokat találsz benne, melyek az elmélyülést, érzelmeidre való reflektálást és az önmagadra való figyelést teszik lehetővé. A rajzolásra, festésre és kollázs technikára épülő témafeldolgozás kizökkent a megszokott gondolkodási sémákból és új perspektívát kínál az önismereti utadon. Mindezt teszi úgy, hogy közben az alkotás örömét éled át. A gyakorlatok végzése során olyan önismereti témákat járhatsz körül, mint „ki vagyok én?” kérdéskör, érzések, értékek és tulajdonságok, múlt és jövő, kapcsolatok, jelenben lenni és a problémamegoldás.<br/><br/>Az 52 gyakorlat némelyikéhez letölthető mellékleteket is találsz, ezek segítik egyes gyakorlatok elvégzését. Gyere és fedezd fel az alkotás által az önmagad felé vezető utat és ne feledd, az alkotási folyamat legalább annyira fontos, mint a végeredmény!',
  //   attachments: [
  //     {
  //       title: '01 Egyedi Vagyok',
  //       url: 'pdfs/milyen-szin-lennel/01-egyedi-vagyok.pdf',
  //     },
  //     {
  //       title: '02 Dolgok Amiket Szeretek',
  //       url: 'pdfs/milyen-szin-lennel/02-dolgok-amiket-szeretek.pdf',
  //     },
  //     {
  //       title: '03 Így Látom Magam',
  //       url: 'pdfs/milyen-szin-lennel/03-igy-latom-magam.pdf',
  //     },
  //     {
  //       title: '04 Életem Fontos Darabjai',
  //       url: 'pdfs/milyen-szin-lennel/04-eletem-fontos-darabjai.pdf',
  //     },
  //     {
  //       title: '05 Érzések Listája',
  //       url: 'pdfs/milyen-szin-lennel/05-erzesek-listaja.pdf',
  //     },
  //     {
  //       title: '06 Érzéseim Színkódja',
  //       url: 'pdfs/milyen-szin-lennel/06-erzeseim-szinkodja.pdf',
  //     },
  //     {
  //       title: '07 Halakocka',
  //       url: 'pdfs/milyen-szin-lennel/07-halakocka.pdf',
  //     },
  //     {
  //       title: '08 Hol Érzed Az Érzéseid',
  //       url: 'pdfs/milyen-szin-lennel/08-hol-erzed-az-erzeseid.pdf',
  //     },
  //     {
  //       title: '09 Összecsomagolt Értékeim',
  //       url: 'pdfs/milyen-szin-lennel/09-osszecsomagolt-ertekeim.pdf',
  //     },
  //     {
  //       title: '10 Szép Pillanatok',
  //       url: 'pdfs/milyen-szin-lennel/10-szep-pillanatok.pdf',
  //     },
  //     {
  //       title: '11 Hátrahagyott Lábnyomom',
  //       url: 'pdfs/milyen-szin-lennel/11-hatrahagyott-labnyomom.pdf',
  //     },
  //     {
  //       title: '12 Küldetésem Címere',
  //       url: 'pdfs/milyen-szin-lennel/12-kuldetesem-cimere.pdf',
  //     },
  //     {
  //       title: '13 Aggodalmaink',
  //       url: 'pdfs/milyen-szin-lennel/13-aggodalmaink.pdf',
  //     },
  //     {
  //       title: '14 Nagyító Alatt',
  //       url: 'pdfs/milyen-szin-lennel/14-nagyito-alatt.pdf',
  //     },
  //     {
  //       title: '15 Megküzdési Stratégiám',
  //       url: 'pdfs/milyen-szin-lennel/15-megkuzdesi-strategiam.pdf',
  //     },
  //   ],
  // });

  constructor() {
    const itemCollection = collection(this.firestore, this.COLLECTION_NAME);
    this.books$ = collectionData<BookDetailsModel>(
      itemCollection as Query<BookDetailsModel>
    ).pipe(
      switchMap((books: BookDetailsModel[]) =>
        Promise.all(
          books.map(async (book) => ({
            ...book,
            pages: await Promise.all(
              book.pages.map(async (page) => {
                const pathReference = ref(this.storage, page);
                return await getDownloadURL(pathReference);
              })
            ),
          }))
        )
      ),
      switchMap((books: BookDetailsModel[]) =>
        Promise.all(
          books.map(async (book) => ({
            ...book,
            attachments: await Promise.all(
              book.attachments.map(async (attachment) => {
                const pathReference = ref(this.storage, attachment.url);
                attachment = {
                  ...attachment,
                  url: await getDownloadURL(pathReference),
                };
                return attachment;
              })
            ),
          }))
        )
      ),
      map((books) => books as BookDetailsModel[])
    );
  }

  getBooks(): Observable<BookDetailsModel[]> {
    return this.books$;
  }

  getMilyenSzinLennelBook(): Observable<BookDetailsModel> {
    return this.books$.pipe(map((books) => books[0]));
  }
}
