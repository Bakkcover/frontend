import { Component, OnInit } from '@angular/core';
import {LibraryService} from "../../services/library.service";
import {Book} from "../../../shared/models/Book";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public books:Observable<Book[]> = new Observable<Book[]>();

  constructor(
    private libraryService:LibraryService
  ) { }

  ngOnInit(): void {
    this.books = this.libraryService.getBooks();
  }
}
