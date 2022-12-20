import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  hide: boolean = true;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private _AuthService: AuthService) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this._AuthService.errorMessage.subscribe(() => {
      this.errorMsg = this._AuthService.errorMessage.getValue();
    });

  }

  signupHandler() {
    if (this.signupForm.valid) {
      this._AuthService.signup(
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.username
      );
    }
  }
}
