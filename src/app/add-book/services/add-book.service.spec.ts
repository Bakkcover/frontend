import { TestBed } from '@angular/core/testing';

import { AddBookService } from './add-book.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AddBookService', () => {
  let service: AddBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AddBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
