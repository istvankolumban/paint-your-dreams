import { Component } from '@angular/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
  standalone: false,
})
export class BookDetailsComponent {
  book = {
    title:
      'Milyen szín lennél? Önismeretet segítő, kreatív gyakorlatok gyűjteménye',
    description:
      'Ha önfejlesztésre vágysz és nyitott vagy az újszerű önkifejezést segítő módszerekre akkor ez a könyv neked szól. A gyakorlatgyűjtemény alkotásra és önismereti munkára hív. Olyan kreatív gyakorlatokat találsz benne, melyek az elmélyülést, érzelmeidre való reflektálást és az önmagadra való figyelést teszik lehetővé. A rajzolásra, festésre és kollázs technikára épülő témafeldolgozás kizökkent a megszokott gondolkodási sémákból és új perspektívát kínál az önismereti utadon. Mindezt teszi úgy, hogy közben az alkotás örömét éled át. A gyakorlatok végzése során olyan önismereti témákat járhatsz körül, mint „ki vagyok én?” kérdéskör, érzések, értékek és tulajdonságok, múlt és jövő, kapcsolatok, jelenben lenni és a problémamegoldás.<br/><br/>Az 52 gyakorlat némelyikéhez letölthető mellékleteket is találsz, ezek segítik egyes gyakorlatok elvégzését. Gyere és fedezd fel az alkotás által az önmagad felé vezető utat és ne feledd, az alkotási folyamat legalább annyira fontos, mint a végeredmény!',
    attachments: [
      {
        title: '01 Egyedi Vagyok',
        url: 'images/milyen-szin-lennel/01-egyedi-vagyok.pdf',
      },
      {
        title: '02 Dolgok Amiket Szeretek',
        url: 'images/milyen-szin-lennel/02-dolgok-amiket-szeretek.pdf',
      },
      {
        title: '03 Így Látom Magam',
        url: 'images/milyen-szin-lennel/03-igy-latom-magam.pdf',
      },
      {
        title: '04 Életem Fontos Darabjai',
        url: 'images/milyen-szin-lennel/04-eletem-fontos-darabjai.pdf',
      },
      {
        title: '05 Érzések Listája',
        url: 'images/milyen-szin-lennel/05-erzesek-listaja.pdf',
      },
      {
        title: '06 Érzéseim Színkódja',
        url: 'images/milyen-szin-lennel/06-erzeseim-szinkodja.pdf',
      },
      {
        title: '07 Halakocka',
        url: 'images/milyen-szin-lennel/07-halakocka.pdf',
      },
      {
        title: '08 Hol Érzed Az Érzéseid',
        url: 'images/milyen-szin-lennel/08-hol-erzed-az-erzeseid.pdf',
      },
      {
        title: '09 Összecsomagolt Értékeim',
        url: 'images/milyen-szin-lennel/09-osszecsomagolt-ertekeim.pdf',
      },
      {
        title: '10 Szép Pillanatok',
        url: 'images/milyen-szin-lennel/10-szep-pillanatok.pdf',
      },
      {
        title: '11 Hátrahagyott Lábnyomom',
        url: 'images/milyen-szin-lennel/11-hatrahagyott-labnyomom.pdf',
      },
      {
        title: '12 Küldetésem Címere',
        url: 'images/milyen-szin-lennel/12-kuldetesem-cimere.pdf',
      },
      {
        title: '13 Aggodalmaink',
        url: 'images/milyen-szin-lennel/13-aggodalmaink.pdf',
      },
      {
        title: '14 Nagyító Alatt',
        url: 'images/milyen-szin-lennel/14-nagyito-alatt.pdf',
      },
      {
        title: '15 Megküzdési Stratégiám',
        url: 'images/milyen-szin-lennel/15-megkuzdesi-strategiam.pdf',
      },
    ],
  };

  orderNowModal = {
    title: 'Rendelj most!',
    content:
      'Ha szeretnéd megrendelni a könyvet, kérlek vedd fel a kapcsolatot Ritával a következő elérhetőségek egyikén:<br/><br/><i class="bi bi-telephone"></i> 0740-519-728<br/><i class="bi bi-envelope"></i> kolumbanrita01@gmail.com',
  };

  onOrderNowClick() {
    const modal = document.getElementById('orderModal');
    if (modal !== null) {
      modal.style.display = 'block';
    }
  }

  onCloseOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal !== null) {
      modal.style.display = 'none';
    }
  }
}
