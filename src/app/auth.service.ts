import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Firestore, doc } from '@angular/fire/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { setDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedin = new BehaviorSubject(false);
  errorMessage = new BehaviorSubject('');
  userId = new BehaviorSubject('');

  constructor(
    public _Auth: Auth,
    private _Router: Router,
    private _Firestore: Firestore
  ) {
    this.userId.next(window.localStorage.getItem('userId') || '');
    if (this.userId.value) {
      this.isLoggedin.next(true);
    } else {
      this.isLoggedin.next(false);
    }
  }

  async signup(email: string, password: string, username: string) {
    await createUserWithEmailAndPassword(this._Auth, email, password)
      .then((res) => {
        setDoc(doc(this._Firestore, 'users', res.user.uid), {
          username: username,
          email: email,
          uid: res.user.uid,
        });
        this.userId.next(res.user.uid);
        this._Router.navigate(['/movie']);
        this.isLoggedin.next(true);
        this.errorMessage.next('');
        window.localStorage.setItem('userId', this.userId.value);
      })
      .catch((err) => {
        this.errorMessage.next('Email already exists , please try again');
        setTimeout(() => {
          this.errorMessage.next('');
        }, 2000);
      });
  }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this._Auth, email, password)
      .then((res) => {
        this.userId.next(res.user.uid);
        this._Router.navigate(['/movie']);
        this.isLoggedin.next(true);
        this.errorMessage.next('');
        window.localStorage.setItem('userId', this.userId.value);
      })
      .catch((err) => {
        this.errorMessage.next('Invalid Email or Password , please try again');

        setTimeout(() => {
          this.errorMessage.next('');
        }, 2000);
      });
  }

  async logout() {
    await signOut(this._Auth)
      .then(() => {
        this.userId.next('');
        this.isLoggedin.next(false);
        this._Router.navigate(['/welcome']);
        window.localStorage.removeItem('userId');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
