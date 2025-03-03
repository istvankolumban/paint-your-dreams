import { Component, OnInit } from '@angular/core';
import {
  BookDetailsModel,
  OurWritingsService,
} from '../our-writings-page/our-writings.service';
import { CarouselItemModel } from './home.service';
import { HomeService } from './home.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: false,
})
export class HomePageComponent implements OnInit {
  introductionText =
    'Célunk a mentálhigiénés szemlélet és a művészeti eszközök ötvözése olyan programokba építve melyek elsősorban a közösségfejlesztést, csapatépítést és önismeretet célozzák. Az általunk alkalmazott eszközök egy része a <a href="https://muralmoral.hu/" target="_blank" rel="noopener"   >Mural Moral Módszer</a >&nbsp; eszköztárát követik. Más eszközök mentálhigiénés szakirodalmat vesznek alapul, valamint egyesek közülük saját fejlesztésűek. Hiszünk abban, hogy a művészetekre épülő kreatív eszközök segítenek közelebb kerülni önmagunkhoz, feloldani csoporton belüli nehézségeket és segítenek a csoportkohézió alakításában. <br />A műhelymunkák végén legtöbbször egy kültéri falfestés valósul meg, ahol a feldolgozott témák, üzenetek jelennek meg a nagyközönség számára. A festés egy fontos része a folyamatnak, de nem a végcélja. A cél, az üzenet maga! A közös gondolkodás, az elmélyülés egy-egy témában.';

  milyenSzinLennelBook: BookDetailsModel | undefined = undefined;

  carouselItems: CarouselItemModel[] = [];
  isEditingCarousel = false;

  constructor(
    private bookService: OurWritingsService,
    private homeService: HomeService,
    private authService: AuthService
  ) {
    this.bookService.getMilyenSzinLennelBook().subscribe((book) => {
      this.milyenSzinLennelBook = book;
    });
  }

  ngOnInit(): void {
    this.homeService.getCarouselItems().subscribe((items) => {
      this.carouselItems = items;
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onEditCarousel(): void {
    this.isEditingCarousel = true;
  }

  onCarouselItemSaved(items: CarouselItemModel[]): void {
    this.homeService.updateCarouselItems(items).subscribe(() => {
      this.carouselItems = items;
      this.isEditingCarousel = false;
    });
  }
}
