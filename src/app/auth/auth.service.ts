import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  error = new BehaviorSubject<string>('');

  constructor(private router: Router, public auth: Auth) {
    // this.auth.onAuthStateChanged((user) => {
    //   this.user.next(user);
    //   if (!user) {
    //     this.router.navigate(['/login']);
    //   }
    // });
  }

  logout(): void {
    this.auth.signOut();
    this.user.next(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.user.value !== null;
  }

  public loginEmailPassword(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.user.next(userCredential.user);
      })
      .catch((error) => this.error.next(error.message));
  }
}
