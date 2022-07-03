import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import {BookListItemComponent} from "./components/book-list-item/book-list-item.component";

@NgModule({
  declarations: [
    BookListComponent,
    BookListItemComponent
  ],
  exports: [
    BookListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LibraryModule { }
