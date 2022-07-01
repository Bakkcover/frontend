import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as moment from 'moment';
import {Observable} from "rxjs";

import {environment} from "../../../../environments/environment";
import {LoggingService} from "../../../services/logging/logging.service";
import {LoggingSeverity} from "../../../services/logging/loggingSeverity";

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
    // implement login logic here
    let httpBody = {
      username,
      password
    }

    return this.http.post(
      this.LOGIN_ENDPOINT, httpBody, this.HTTP_OPTIONS
    )
  }

  public logout(): void {
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
  }

  public signup(username:string, email:string, password:string): Observable<Object> {
    // implement signup logic here
    let httpBody = {
      username,
      email,
      password
    }

    return this.http.post(
      this.SIGNUP_ENDPOINT, httpBody, this.HTTP_OPTIONS
    )
  }

  public setSession(authResult:any): void {
    this.log("Saving id_token, access_token, expires_at...", LoggingSeverity.INFO);

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

  private log(m:string, severity:LoggingSeverity) {
    let message:string = `AuthService: ${m}`;

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
