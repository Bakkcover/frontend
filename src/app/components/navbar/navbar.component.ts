import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../modules/auth/services/auth.service";
import {createPopper} from "@popperjs/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  public showDropdownPopover:boolean = false;

  @ViewChild("btnDropdownRef", { static: false })
  btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef!: ElementRef;

  popperInstance:any;

  constructor(
    private authService:AuthService
  ) { }

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

    if (this.showDropdownPopover) {
      this.showDropdownPopover = false;
    } else {
      this.showDropdownPopover = true;
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
