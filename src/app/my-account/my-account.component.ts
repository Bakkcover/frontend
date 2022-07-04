import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth/services/auth.service";
import {User} from "../shared/models/User";
import {UserDetailsService} from "../shared/services/user-details/user-details.service";

@Component({
  selector: 'app-home',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user?:User;

  constructor(
    private authService: AuthService,
    private userDetailsService: UserDetailsService
  ) { }

  ngOnInit(): void {
    this.getLoggedInUserDetails();
  }

  getLoggedInUserDetails(): void {
    this.userDetailsService.getLoggedInUserDetails()
      .subscribe({
        next: res => {
          this.user = res.user;
          },
        complete: () => {
          console.log('Fetched user details');
        },
        error: err => {
          console.log(err);
        }
      });
  }

  getUsername(): string {
    return this.user?.username ?? "No username found.";
  }

  getEmail(): string {
    return this.user?.email ?? "No email found.";
  }

  getFirstName(): string {
    return this.user?.firstName ?? "No first name found.";
  }

  getLastName(): string {
    return this.user?.lastName ?? "No last name found.";
  }
}
