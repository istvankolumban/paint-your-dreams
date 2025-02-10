import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable()
export class AuthService {
  private readonly USER_STORAGE_KEY = 'userData';
  private autoLogoutTimer: any;
  user = new BehaviorSubject<User | null>(null);

  constructor(private readonly http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZjANsGZAViJOhs0qHqJZ5TztwCkLKDVA',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) =>
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          )
        )
      );
  }

  autoLogin(): void {
    const userData = localStorage.getItem(this.USER_STORAGE_KEY);
    if (!userData) {
      return;
    }
    const parsedUser: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(userData);

    const loggedInUser = new User(
      parsedUser.email,
      parsedUser.id,
      parsedUser._token,
      parsedUser._tokenExpirationDate
    );

    if (loggedInUser.token) {
      this.user.next(loggedInUser);
      const expirationDuration =
        new Date(parsedUser._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem(this.USER_STORAGE_KEY);
    if (this.autoLogoutTimer) {
      clearInterval(this.autoLogoutTimer);
      this.autoLogoutTimer = null;
    }
  }

  private handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const exparationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, localId, idToken, exparationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user));
  }

  autoLogout(expirationDuration: number): void {
    this.autoLogoutTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      throwError(() => new Error(errorMessage));
    }

    switch (errorResponse.error.error.message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage =
          'There is no user record corresponding to this identifier or the password is invalid.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }
}
