import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly GOOGLE_BOOKS_API_ROUTE_REGEX = new RegExp('https://www.googleapis.com/books/v1/volumes*');

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const accessToken = localStorage.getItem("access_token");

    if (this.isHttpRequestToGoogleBooksApi(req.url)) {
      // don't attach JWT token in HTTP requests made to Google Books API
      return next.handle(req);
    } else if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + accessToken)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }

  private isHttpRequestToGoogleBooksApi(url:string): boolean {
    return this.GOOGLE_BOOKS_API_ROUTE_REGEX.test(url);
  }
}
