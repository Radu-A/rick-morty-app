import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  service = inject(AuthService);
  loginMessage = signal<string | undefined>(undefined);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  tryLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const response = this.service.checkEmailAndPassword(email!, password!);
      this.loginMessage.set(response.message);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
