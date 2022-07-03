import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth/services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  username?:string;
  email?:string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.email = this.authService.getEmail();
  }

}
