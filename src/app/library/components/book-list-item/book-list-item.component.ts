import {Component, Input, OnInit} from '@angular/core';
import {Book, EMPTY_BOOK} from "../../../shared/models/Book";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent implements OnInit {
  @Input()
  public book:Book = EMPTY_BOOK;

  private readonly BOOK_DETAILS_ROUTE = "/book/";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.router.navigate([this.BOOK_DETAILS_ROUTE, this.book.id]);
  }

}
