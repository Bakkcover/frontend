import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {AddBookDto, DEFAULT_ADD_BOOK_DTO} from "./dtos/AddBookDto";
import {AddBookService} from "./services/add-book.service";
import {SearchBookResultItemDto} from "./dtos/SearchBookResultItemDto";
import {Observable} from "rxjs";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  public successNotification?:string;
  public errorNotification?:string;

  public searchResults:Observable<SearchBookResultItemDto[]> = new Observable<SearchBookResultItemDto[]>();

  form = new FormGroup({
    "title": new FormControl("", Validators.required),
    "author": new FormControl(""),
    "publisher": new FormControl(""),
    "details": new FormControl(""),
  });

  constructor(
    private addBookService:AddBookService
  ) { }

  ngOnInit(): void {
    this.runSearchOnChanges();
  }

  onSubmit(): void {
    let SUCCESS_MESSAGE:string = "Book successfully listed!";
    let ERROR_MESSAGE:string = "Could not list your book :(";

    let bookToAdd:AddBookDto = DEFAULT_ADD_BOOK_DTO;
    Object.keys(this.form.controls)
      .filter((key:string) => {
        return this.form.get(key)?.value != null
      })
      .forEach((key:string) => {
        let value:string = this.form.get(key)?.value;
        bookToAdd = {...bookToAdd, ...{[key]: value}}
    });

    this.addBookService.addBook(bookToAdd)
      .subscribe({
        complete: () => this.successNotification = SUCCESS_MESSAGE,
        error: () => this.errorNotification = ERROR_MESSAGE
      })
  }

  public searchBook(): void {
    this.searchResults = this.addBookService.searchBook(
      this.form.controls.title.value ?? undefined,
      this.form.controls.author.value ?? undefined,
      this.form.controls.publisher.value ?? undefined
    );
  }

  private runSearchOnChanges(): void {
    this.form.valueChanges
      .subscribe(() => this.searchBook());
  }
}
