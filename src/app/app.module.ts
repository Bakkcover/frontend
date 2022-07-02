import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthModule} from "./modules/auth/auth.module";
import { MyAccountComponent } from './components/my-account/my-account.component';
import { LoggedInGuard } from './loggedin.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { LibraryComponent } from './components/library/library.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MyAccountComponent,
    NavbarComponent,
    HowItWorksComponent,
    LibraryComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule
  ],
  providers: [LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
