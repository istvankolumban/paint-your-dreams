import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
// import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
// import {
//   collection,
//   collectionData,
//   Firestore,
//   Query,
// } from '@angular/fire/firestore';
// import { BookDetailsModel } from './shared/book-details/book/book.types';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'paint-your-dreams';
  // storage = inject(Storage);
  // firestore = inject(Firestore);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();

    // const pathReference = ref(this.storage, 'borito_back.jpg');
    // const url = getDownloadURL(pathReference);
    // console.log(url);

    // const itemCollection = collection(this.firestore, 'books');
    // collectionData<BookDetailsModel>(
    //   itemCollection as Query<BookDetailsModel>
    // ).subscribe((data) => {
    //   console.log(data);
    // });
  }
}
