import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FlipBookModule,
    ReactiveFormsModule,
  ],
  providers: [BookService, provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
