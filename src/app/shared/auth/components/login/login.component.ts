import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {LoggingSeverity} from "../../../services/logging/loggingSeverity";
import {LoggingService} from "../../../services/logging/logging.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public errorMessage?:string;

  form = new FormGroup({
    "username": new FormControl("test", Validators.required),
    "password": new FormControl("Qwerty1@34", Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private loggingService: LoggingService
  ) { }

  onSubmit(): void {
    let username:string = this.form.controls.username.value ?? "USERNAME MISSING";
    let password:string = this.form.controls.password.value ?? "PASSWORD MISSING";

    this.authService.login(username, password)
      .subscribe(
      {
        next: (res) => this.authService.setSession(res),
        complete: () => {
          this.log('User successfully signed in!', LoggingSeverity.SUCCESS);
          this.redirectToMyAccount();
        },
        error: err => {
          this.log(`${JSON.stringify(err)}`, LoggingSeverity.ERROR);
          this.errorMessage = err.error.errorMessage;
        }
      });
  }

  private redirectToMyAccount(): void {
    this.router.navigateByUrl("/myaccount");
  }

  private log(m:string, severity:LoggingSeverity) {
    let message:string = `LoginService: ${m}`;

    switch (severity) {
      case LoggingSeverity.SUCCESS:
        this.loggingService.logSuccess(message);
        break;
      case LoggingSeverity.ERROR:
        this.loggingService.logError(message);
        break;
      case LoggingSeverity.INFO:
        this.loggingService.logInfo(message);
        break;
      default:
        this.loggingService.logInfo(message);
    }
  }
}
