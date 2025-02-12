import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { OurProjectsPageComponent } from './pages/our-projects-page/our-projects-page.component';
import { ProjectCardComponent } from './pages/our-projects-page/project-card/project-card.component';
import { OurWritingsPageComponent } from './pages/our-writings-page/our-writings-page.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { BookComponent } from './shared/book-details/book/book.component';
import { FlipBookModule } from '@labsforge/flipbook';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { OurServicesComponent } from './shared/our-services/our-services.component';
import { TestimonialsComponent } from './shared/testimonials/testimonials.component';
import { BookDetailsComponent } from './shared/book-details/book-details.component';
import { BookService } from './services/book.service';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { AsyncPipe } from '@angular/common';

const firebaseConfig = {
  apiKey: 'AIzaSyAZjANsGZAViJOhs0qHqJZ5TztwCkLKDVA',
  authDomain: 'paint-your-dreams.firebaseapp.com',
  projectId: 'paint-your-dreams',
  storageBucket: 'paint-your-dreams.firebasestorage.app',
  messagingSenderId: '465030610562',
  appId: '1:465030610562:web:a35660aa769bac9f75fe9b',
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    OurProjectsPageComponent,
    OurWritingsPageComponent,
    BookComponent,
    CarouselComponent,
    OurServicesComponent,
    TestimonialsComponent,
    BookDetailsComponent,
    ProjectCardComponent,
    OrderModalComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FlipBookModule,
    FormsModule,
    AsyncPipe
  ],
  providers: [
    BookService,
    AuthService,
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig))
    ),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
