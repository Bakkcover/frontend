import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryComponent } from './library.component';
import {BookListItemComponent} from "./components/book-list-item/book-list-item.component";
import {BookListComponent} from "./components/book-list/book-list.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [
        LibraryComponent,
        BookListComponent,
        BookListItemComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
