import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable, shareReplay, tap} from "rxjs";
import {GetUserDetailsDto} from "./dtos/GetUserDetailsDto";
import {LoggingService} from "../logging/logging.service";
import {LoggingSeverity} from "../logging/loggingSeverity";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private readonly GETLOGGEDINUSERDETAILS_ENDPOINT:string = `${environment.apiUrl}/users/detail`;

  constructor(
    private http: HttpClient,
    private loggingService: LoggingService
  ) { }

  getLoggedInUserDetails(): Observable<User> {
    let SUCCESS_MESSAGE:string = "Fetched user's details!";

    return this.http.get<GetUserDetailsDto>(this.GETLOGGEDINUSERDETAILS_ENDPOINT)
      .pipe(
        map((res) => res.user),
        tap({
          complete: () => this.loggingService.log(SUCCESS_MESSAGE, LoggingSeverity.SUCCESS),
          error: err => this.loggingService.log(err.error.errorMessage)
        }),
        shareReplay()
      );
  }
}
