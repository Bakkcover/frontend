import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AddBookDto} from "../dtos/AddBookDto";
import {Observable, tap} from "rxjs";
import {LoggingService} from "../../shared/services/logging/logging.service";
import {LoggingSeverity} from "../../shared/services/logging/loggingSeverity";

@Injectable({
  providedIn: 'root'
})
export class AddBookService {
  private readonly ADD_BOOK_ENDPOINT:string = `${environment.apiUrl}/books/add`;
  private readonly HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private loggingService: LoggingService
  ) { }

  public addBook(book:AddBookDto): Observable<any> {
    let SUCCESS_MESSAGE = "Book successfully added";
    let ERROR_MESSAGE = "Could not add book";

    return this.http.post(this.ADD_BOOK_ENDPOINT, book, this.HTTP_OPTIONS)
      .pipe(
        tap({
          complete: () => this.loggingService.log(SUCCESS_MESSAGE, LoggingSeverity.SUCCESS),
          error: () => { this.loggingService.log(ERROR_MESSAGE, LoggingSeverity.ERROR); }
        })
      );
  }
}
