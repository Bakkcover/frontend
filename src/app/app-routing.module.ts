import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./modules/auth/auth.component";
import {HomeComponent} from "./components/home/home.component";
import {LoggedInGuard} from "./loggedin.guard";


const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: "full" },
  { path: 'auth', component: AuthComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
