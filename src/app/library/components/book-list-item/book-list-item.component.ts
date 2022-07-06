import {Component, Input, OnInit} from '@angular/core';
import {Book, EMPTY_BOOK} from "../../../shared/models/Book";

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent implements OnInit {
  @Input()
  public book:Book = EMPTY_BOOK;

  constructor() { }

  ngOnInit(): void {
  }

}
