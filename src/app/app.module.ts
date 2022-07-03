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
import { BookListItemComponent } from './library/book-list-item/book-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MyAccountComponent,
    NavbarComponent,
    HowItWorksComponent,
    LibraryComponent,
    ContactUsComponent,
    BookListItemComponent
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
