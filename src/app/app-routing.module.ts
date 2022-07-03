import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./shared/auth/auth.component";
import {MyAccountComponent} from "./my-account/my-account.component";
import {HowItWorksComponent} from "./how-it-works/how-it-works.component";
import {LibraryComponent} from "./library/library.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {LoggedInGuard} from "./loggedin.guard";


const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: "full" },
  { path: 'auth', component: AuthComponent },
  { path: 'howitworks', component: HowItWorksComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'contactus', component: ContactUsComponent },
  {
    path: 'myaccount',
    component: MyAccountComponent,
    canActivate: [LoggedInGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
