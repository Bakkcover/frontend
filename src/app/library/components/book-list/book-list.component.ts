import { Component, OnInit } from '@angular/core';
import {LibraryService} from "../../services/library/library.service";
import {Book} from "../../models/Book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public books:Book[] = [];

  constructor(
    private libraryService:LibraryService
  ) { }

  ngOnInit(): void {
    this.books = this.libraryService.getBooks();
  }
}
