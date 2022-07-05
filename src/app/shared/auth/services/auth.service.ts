import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as moment from 'moment';
import {Observable, shareReplay, tap} from "rxjs";

import {environment} from "../../../../environments/environment";
import {LoggingService} from "../../services/logging/logging.service";
import {LoggingSeverity} from "../../services/logging/loggingSeverity";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LOGIN_ENDPOINT:string = `${environment.apiUrl}/users/sign-in`;
  private readonly SIGNUP_ENDPOINT:string = `${environment.apiUrl}/users/sign-up`;
  private readonly HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private loggingService: LoggingService
  ) { }

  public login(username:string, password:string): Observable<Object> {
    let SUCCESS_MESSAGE = "User successfully signed in!";

    let httpBody = {
      username,
      password
    }

    return this.http.post(this.LOGIN_ENDPOINT, httpBody, this.HTTP_OPTIONS)
        .pipe(
          tap({
            next: res => this.setSession(res),
            complete: () => this.loggingService.log(SUCCESS_MESSAGE, LoggingSeverity.SUCCESS),
            error: err => {
              let errorMessage:string = err.error.errorMessage;
              this.loggingService.log(errorMessage, LoggingSeverity.ERROR);
            }
          }),
          shareReplay()
        );
  }

  public logout(): void {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
  }

  public signup(username:string, email:string, password:string): Observable<Object> {
    let SUCCESS_MESSAGE = "User successfully signed up!";

    let httpBody = {
      username,
      email,
      password
    }

    return this.http.post(this.SIGNUP_ENDPOINT, httpBody, this.HTTP_OPTIONS)
      .pipe(
        tap({
          complete: () => this.loggingService.log(SUCCESS_MESSAGE, LoggingSeverity.SUCCESS),
          error: err => {
            let errorMessage:string = err.error.errorMessage;
            this.loggingService.log(errorMessage, LoggingSeverity.ERROR);
          }
        }),
        shareReplay()
      );
  }

  private setSession(authResult:any): void {
    this.loggingService.log("Saving id_token, access_token, expires_at...", LoggingSeverity.INFO);

    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public isLoggedIn(): boolean {
    if (localStorage.getItem('expires_at') === null) {
      return false;
    }

    return moment().isBefore(this.getExpiration());
  }

  private getExpiration(): moment.Moment {
    const expiration:string = localStorage.getItem('expires_at') ?? "";
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }
}
