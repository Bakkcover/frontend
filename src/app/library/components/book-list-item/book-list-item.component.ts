import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent implements OnInit {
  @Input()
  public title:string = '';
  @Input()
  public author:string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
