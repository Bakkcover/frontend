import { Injectable } from '@angular/core';

import {Book} from "../../models/Book";
import {mockBooks} from "../../mockData";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  mockData:Book[] = mockBooks;

  constructor() { }

  public getBooks():Book[] {
    return this.mockData;
  }
}
