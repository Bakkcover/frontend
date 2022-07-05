import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public errorMessage?:string;

  form = new FormGroup({
    "username": new FormControl("", Validators.required),
    "password": new FormControl("", Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    let username:string = this.form.controls.username.value ?? "USERNAME MISSING";
    let password:string = this.form.controls.password.value ?? "PASSWORD MISSING";

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
