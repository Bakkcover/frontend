import { Component, OnInit } from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public isShowingLoginComponent:boolean = true;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public switchToLoginComponent(): void {
    this.isShowingLoginComponent = true;
  }

  public switchToSignupComponent(): void {
    this.isShowingLoginComponent = false;
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public logout(): void {
    this.authService.logout();
  }
}
