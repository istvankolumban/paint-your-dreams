import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ProjectDetailsComponent } from './pages/our-projects-page/project-details/project-details.component';
import { OurWritingsPageComponent } from './pages/our-writings-page/our-writings-page.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { BookComponent } from './pages/our-writings-page/book-details/book/book.component';
import { FlipBookModule } from '@labsforge/flipbook';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { OurServicesComponent } from './shared/our-services/our-services.component';
import { TestimonialsComponent } from './shared/testimonials/testimonials.component';
import { BookDetailsComponent } from './pages/our-writings-page/book-details/book-details.component';
import { OurWritingsService } from './pages/our-writings-page/our-writings.service';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { environment } from '../environments/environment';
import { OurProjectsService } from './pages/our-projects-page/our-projects.service';
import { ProjectDetailsEditComponent } from './pages/our-projects-page/project-details-edit/project-details-edit.component';
import { AssetManagerComponent } from './pages/asset-manager/asset-manager.component';
import { SafeUrlPipe } from './pages/asset-manager/safe-url-pipe';
import { AssetSelectorComponent } from './shared/asset-selector/asset-selector.component';
import { BookDetailsEditComponent } from './pages/our-writings-page/book-details-edit/book-details-edit.component';
import { AdminHeaderComponent } from './shared/admin-header/admin-header.component';
import { PublicationDetailsComponent } from './pages/our-writings-page/publication-details/publication-details.component';

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
    ProjectDetailsComponent,
    OrderModalComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    AuthComponent,
    ProjectDetailsEditComponent,
    AssetManagerComponent,
    SafeUrlPipe,
    AssetSelectorComponent,
    BookDetailsEditComponent,
    AdminHeaderComponent,
    PublicationDetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FlipBookModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  providers: [
    OurWritingsService,
    AuthService,
    OurProjectsService,
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
    ),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
