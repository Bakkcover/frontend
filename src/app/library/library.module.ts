import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import {BookListItemComponent} from "./components/book-list-item/book-list-item.component";
import { BookDetailsComponent } from './components/book-details/book-details.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent
  ],
  exports: [
    BookListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LibraryModule { }
