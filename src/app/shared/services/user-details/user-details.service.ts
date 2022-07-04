import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GetUserDetailsDto} from "./dtos/GetUserDetailsDto";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private readonly GETLOGGEDINUSERDETAILS_ENDPOINT:string = `${environment.apiUrl}/users/detail`;

  constructor(
    private http: HttpClient
  ) { }

  getLoggedInUserDetails(): Observable<GetUserDetailsDto> {
    return this.http.get<GetUserDetailsDto>(
      this.GETLOGGEDINUSERDETAILS_ENDPOINT
    );
  }
}
