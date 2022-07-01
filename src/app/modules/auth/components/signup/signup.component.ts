import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {LoggingSeverity} from "../../../../services/logging/loggingSeverity";
import {LoggingService} from "../../../../services/logging/logging.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public errorMessage?:string;

  form = new FormGroup({
    "username": new FormControl("test", Validators.required),
    "email": new FormControl("test@example.com", Validators.required),
    "password": new FormControl("Qwerty1@34", Validators.required)
  })

  constructor(
    private authService:AuthService,
    private loggingService:LoggingService
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
          complete: () => {
            this.log('User successfully signed up!', LoggingSeverity.SUCCESS);
          },
          error: err => {
            this.log(`${JSON.stringify(err)}`, LoggingSeverity.ERROR);
            this.errorMessage = err.error.errorMessage;
          }
        });
  }

  private log(m:string, severity:LoggingSeverity) {
    let message:string = `SignupService: ${m}`;

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
