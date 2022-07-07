import {Component, Input, OnInit} from '@angular/core';
import {Book, EMPTY_BOOK} from "../../../shared/models/Book";
import {Router} from "@angular/router";
import {LibraryService} from "../../services/library.service";

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
    private libraryService: LibraryService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToDetailsPage(): void {
    this.router.navigate([this.BOOK_DETAILS_ROUTE, this.book.id]);
  }

  adoptBook(): void {
    this.libraryService.adoptBook(this.book.id)
      .subscribe({
        // reload the page when book has been successfully adopted
        complete: () => location.reload()
      });
  }
}
