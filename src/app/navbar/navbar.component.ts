import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../shared/auth/services/auth.service";
import {createPopper} from "@popperjs/core";
import {Router} from "@angular/router";
import {User} from "../shared/models/User";
import {UserDetailsService} from "../shared/services/user-details/user-details.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  public showDropdownPopover:boolean = false;

  user?: User;

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
    this.getLoggedInUserDetails();
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
