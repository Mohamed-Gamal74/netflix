import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  hide: boolean = true;
  signinForm: FormGroup;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private _AuthService: AuthService) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this._AuthService.errorMessage.subscribe(() => {
      this.errorMsg = this._AuthService.errorMessage.getValue();
    });
  }

  signinHandler() {
    if (this.signinForm.valid) {
      this._AuthService.login(
        this.signinForm.value.email,
        this.signinForm.value.password
      );
    }
  }
}
