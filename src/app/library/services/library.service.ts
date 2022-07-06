import {Injectable} from '@angular/core';

import {Book, EMPTY_BOOK} from "../../shared/models/Book";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoggingService} from "../../shared/services/logging/logging.service";
import {map, Observable, shareReplay, tap} from "rxjs";
import {GetBooksDto} from "../dtos/GetBooksDto";
import {GetBookDto} from "../dtos/GetBookDto";
import {LoggingSeverity} from "../../shared/services/logging/loggingSeverity";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private readonly GET_ALL_BOOKS_ENDPOINT:string = `${environment.apiUrl}/books/all`;
  private readonly GET_BOOK_ENDPOINT:string = `${environment.apiUrl}/books/book`;

  private readonly HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http:HttpClient,
    private loggingService:LoggingService
  ) { }

  public getBooks(): Observable<Book[]> {
    let SUCCESS_MESSAGE:string = "Fetched all books!";
    let ERROR_MESSAGE:string = "Failed to fetch all books!";

    return this.http.get<GetBooksDto>(this.GET_ALL_BOOKS_ENDPOINT, this.HTTP_OPTIONS)
      .pipe(
        tap({
          complete: () => this.loggingService.log(SUCCESS_MESSAGE),
          error: err => this.loggingService.log(`${ERROR_MESSAGE} ${err}`)
        }),
        map(res => res.list.map(
          (book:Book) => {
            // remove all attributes that are equal to an empty-string from the object
            let filteredBook:Partial<Book> = Object.fromEntries(
              Object.entries(book)
                .filter(([_, v]) => v !== "")
            );

            // replace removed attributes with default attributes
            return {...EMPTY_BOOK, ...filteredBook};
          })
        ),
        shareReplay()
      );
  }

  public getBook(id:number): Observable<Book> {
    let SUCCESS_MESSAGE:string = `Fetched book ${id}!`;
    let ERROR_MESSAGE:string = `Failed to fetch book ${id}!`;

    let params:any = { id };

    return this.http.get<GetBookDto>(this.GET_BOOK_ENDPOINT, { params })
      .pipe(
        tap({
          complete: () => this.loggingService.log(SUCCESS_MESSAGE, LoggingSeverity.SUCCESS),
          error: () => this.loggingService.log(ERROR_MESSAGE, LoggingSeverity.ERROR)
        }),
        map(res => { return res.book; }),
        shareReplay()
      );
  }
}
