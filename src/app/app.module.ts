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
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OurProjectsComponent } from './our-projects/our-projects.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { BookComponent } from './book/book.component';
import { FlipBookModule } from '@labsforge/flipbook';
import { CarouselComponent } from './carousel/carousel.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ProjectCardComponent } from './our-projects/project-card/project-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    OurProjectsComponent,
    ContactComponent,
    BookComponent,
    CarouselComponent,
    OurServicesComponent,
    TestimonialsComponent,
    BookDetailsComponent,
    ProjectCardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FlipBookModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
