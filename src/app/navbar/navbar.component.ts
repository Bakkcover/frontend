import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../shared/auth/services/auth.service";
import {createPopper} from "@popperjs/core";
import {Router} from "@angular/router";
import {User} from "../shared/models/User";
import {UserDetailsService} from "../shared/services/user-details/user-details.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  public showDropdownPopover:boolean = false;

  user$?:Observable<User>;

  @ViewChild("btnDropdownRef", { static: false })
  btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef!: ElementRef;

  popperInstance:any;

  constructor(
    private authService:AuthService,
    private userDetailsService:UserDetailsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user$ = this.userDetailsService.getLoggedInUserDetails();
  }

  ngAfterViewInit() {
    this.popperInstance = createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement:"auto"
      }
    )
  }

  toggleDropdown(event:any) {
    event.preventDefault();
    this.showDropdownPopover = !this.showDropdownPopover;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.showDropdownPopover = !this.showDropdownPopover;
    this.authService.logout();
    this.redirectToAuth();
  }

  private redirectToAuth(): void {
    this.router.navigateByUrl("/auth");
  }
}
