import { Component } from '@angular/core';
import { BookDetailsModel } from '../../shared/book-details/book/book.types';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: false,
})
export class HomePageComponent {
  introductionText =
    'Célunk a mentálhigiénés szemlélet és a művészeti eszközök ötvözése olyan programokba építve melyek elsősorban a közösségfejlesztést, csapatépítést és önismeretet célozzák. Az általunk alkalmazott eszközök egy része a <a href="https://muralmoral.hu/" target="_blank" rel="noopener"   >Mural Moral Módszer</a >&nbsp; eszköztárát követik. Más eszközök mentálhigiénés szakirodalmat vesznek alapul, valamint egyesek közülük saját fejlesztésűek. Hiszünk abban, hogy a művészetekre épülő kreatív eszközök segítenek közelebb kerülni önmagunkhoz, feloldani csoporton belüli nehézségeket és segítenek a csoportkohézió alakításában. <br />A műhelymunkák végén legtöbbször egy kültéri falfestés valósul meg, ahol a feldolgozott témák, üzenetek jelennek meg a nagyközönség számára. A festés egy fontos része a folyamatnak, de nem a végcélja. A cél, az üzenet maga! A közös gondolkodás, az elmélyülés egy-egy témában.';

  milyenSzinLennelBook: BookDetailsModel;

  constructor(private readonly bookService: BookService) {
    this.milyenSzinLennelBook = this.bookService.getMilyenSzinLennelBook();
  }
}
