import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: false,
  host: {
    class: 'page',
  },
})
export class AuthComponent {
  isLoading = false;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.isLoading = false;
        this.router.navigate(['/']);
      }
    });
    this.authService.error.subscribe((error) => {
      this.error = error;
      this.isLoading = false;
    });
  }

  onSubmit(form: NgForm) {
    this.error = '';
    if (!form.valid) {
      return;
    }
    this.authService.loginEmailPassword(
      form.value.email,
      form.value.password
    );
    this.isLoading = true;
    form.reset();
  }
}
