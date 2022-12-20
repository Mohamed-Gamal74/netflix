import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nvabar',
  templateUrl: './nvabar.component.html',
  styleUrls: ['./nvabar.component.css'],
})
export class NvabarComponent implements OnInit {
  fixed: boolean = false;
  logged: boolean = false;

  constructor(
    private _Router: Router,
    private _AuthService: AuthService,
  ) {}

  ngOnInit(): void {
    this._AuthService.isLoggedin.subscribe((res) => {
      this.logged = res;
    });

  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    window.pageYOffset > 10 ? (this.fixed = true) : (this.fixed = false);
  }

  signinHandler() {
    this._Router.navigate(['/signin']);
  }

  logoutHandler() {
    this._AuthService.logout();
  }
}
