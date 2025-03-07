import { Component, OnInit } from '@angular/core';
import { HomeService, HomeAboutTextModel } from './home.service';
import { BookDetailsModel, OurWritingsService } from '../our-writings-page/our-writings.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: false,
})
export class HomePageComponent implements OnInit {
  aboutText: HomeAboutTextModel | null = null;
  isEditingAboutText = false;
  milyenSzinLennelBook: BookDetailsModel | undefined = undefined;

  constructor(private homeService: HomeService, private bookService: OurWritingsService, private authService: AuthService) {
    this.bookService.getMilyenSzinLennelBook().subscribe((book) => {
      this.milyenSzinLennelBook = book;
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();  
  }

  ngOnInit(): void {
    this.homeService.getAboutText().subscribe((aboutText) => {
      this.aboutText = aboutText;
    });
  }

  onEditAboutText(): void {
    this.isEditingAboutText = true;
  }

  onAboutTextSaved(updatedText: HomeAboutTextModel): void {
    this.homeService.updateAboutText(updatedText).subscribe(() => {
      this.aboutText = updatedText;
      this.isEditingAboutText = false;
    });
  }
}
