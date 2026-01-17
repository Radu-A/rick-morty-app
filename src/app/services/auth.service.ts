import { Injectable } from '@angular/core';

import { UserState } from '../models/user.model';
import USERS from '../users.db';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users = USERS;
  checkEmailAndPassword(email: string, password: string): UserState {
    const user = this.users.find((user) => user.email === email);
    if (!user) return { connected: false, message: "This email doesn't exist in sistem." };

    const isCorrectPassword = user.password === password;

    if (!password) return { connected: false, message: 'Wrong password, try again.' };

    const token = {
      id: user.id,
      email: user.email,
    };

    localStorage.setItem('rmToken', JSON.stringify(token));

    return { connected: true, message: 'User connected' };
  }
}
