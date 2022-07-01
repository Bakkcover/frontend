import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./modules/auth/services/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/auth');

      return false;
    } else {
      return true;
    }
  }
}
