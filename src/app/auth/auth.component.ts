import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  standalone: false,
  host: {
    class: 'page',
  },
})
export class AuthComponent {
  isLoading = false;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    let authObs: Observable<AuthResponseData> = this.authService.login(
      form.value.email,
      form.value.password
    );
    this.isLoading = true;
    authObs.subscribe({
      next: (responseData) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      },
    });
    form.reset();
  }
}
