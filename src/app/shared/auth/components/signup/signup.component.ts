import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public errorMessage?:string;

  form = new FormGroup({
    "username": new FormControl("", Validators.required),
    "email": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required)
  })

  constructor(
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let username:string = this.form.controls.username.value ?? "USERNAME MISSING";
    let email:string = this.form.controls.email.value ?? "EMAIL MISSING";
    let password:string = this.form.controls.password.value ?? "PASSWORD MISSING";

    this.authService.signup(username, email, password)
      .subscribe(
        {
          complete: () => this.loginAfterSuccessfulSignup(username, password),
          error: err => {
            this.errorMessage = err.error.errorMessage;
          }
        });
  }

  private loginAfterSuccessfulSignup(username:string, password:string): void {
    this.authService.login(username, password)
      .subscribe({
        complete: () => {
          this.redirectToMyAccount();
        },
        error: err => {
          this.errorMessage = err.error.errorMessage;
        }
      });
  }

  private redirectToMyAccount(): void {
    this.router.navigateByUrl("/myaccount");
  }
}
