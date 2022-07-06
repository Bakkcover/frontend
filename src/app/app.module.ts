import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from "./shared/auth/auth.module";
import { MyAccountComponent } from './my-account/my-account.component';
import { LoggedInGuard } from './loggedin.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { LibraryComponent } from './library/library.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {ReactiveFormsModule} from "@angular/forms";
import {LibraryModule} from "./library/library.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth/interceptors/auth.interceptor";
import {AddBookModule} from "./add-book/add-book.module";
import {AddBookComponent} from "./add-book/add-book.component";

@NgModule({
  declarations: [
    AppComponent,
    MyAccountComponent,
    NavbarComponent,
    HowItWorksComponent,
    LibraryComponent,
    ContactUsComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule,
    LibraryModule,
    AddBookModule
  ],
  providers: [LoggedInGuard, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
