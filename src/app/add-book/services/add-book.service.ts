import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {AddBookDto} from "../dtos/AddBookDto";
import {map, Observable, tap} from "rxjs";
import {LoggingService} from "../../shared/services/logging/logging.service";
import {LoggingSeverity} from "../../shared/services/logging/loggingSeverity";
import {SearchBookQueryBuilder} from "../misc/SearchBookQueryBuilder";
import {SearchBookResultItemDto} from "../dtos/SearchBookResultItemDto";

@Injectable({
  providedIn: 'root'
})
export class AddBookService {
  private readonly ADD_BOOK_ENDPOINT:string = `${environment.apiUrl}/books/add`;
  private readonly GOOGLE_BOOKS_ENDPOINT:string = `${environment.googleBooksApiUrl}`;

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

  public searchBook(title?:string, author?:string, publisher?:string, subject?:string, isbn?:string): Observable<SearchBookResultItemDto[]> {
    let searchBookQueryBuilder: SearchBookQueryBuilder  = new SearchBookQueryBuilder();

    if (title) { searchBookQueryBuilder.addTitle(title); }
    if (author) { searchBookQueryBuilder.addAuthor(author); }
    if (publisher) { searchBookQueryBuilder.addPublisher(publisher); }
    if (subject) { searchBookQueryBuilder.addSubject(subject); }
    if (isbn) { searchBookQueryBuilder.addIsbn(isbn); }

    let FULL_ENDPOINT:string = this.GOOGLE_BOOKS_ENDPOINT.concat(searchBookQueryBuilder.getQuery());

    return this.http.get<any>(FULL_ENDPOINT)
      .pipe(
        map(res => res.items),
        map(items => {
          return items.map((item:any) => {
            let book:SearchBookResultItemDto = {
              title: item.volumeInfo.title,
              author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : "No author found.",
              publisher: item.volumeInfo.publisher? item.volumeInfo.publisher : "No publisher found",
              details: item.volumeInfo.description? item.volumeInfo.description : "No description found",
              thumbnail: item.volumeInfo.imageLinks?.thumbnail ?? item.volumeInfo.imageLinks?.smallThumbnail
            }

            return book;
          })
        })
      )
  }

}
