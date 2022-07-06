import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {LibraryService} from "../../services/library.service";
import {map, Observable, switchMap} from "rxjs";
import {Book} from "../../../shared/models/Book";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  public book:Observable<Book> = new Observable<Book>();

  constructor(
    private activatedRoute:ActivatedRoute,
    private libraryService:LibraryService
  ) { }

  ngOnInit(): void {
    this.book = this.getBook();
  }

  private getBook(): Observable<Book> {
    return this.getIdFromRoute()
      .pipe(
        switchMap(id => this.libraryService.getBook(id))
      );
  }

  private getIdFromRoute(): Observable<any> {
    return this.activatedRoute.paramMap
      .pipe(
        map(params => {
          return params.get('id')
        })
      )
  }
}
