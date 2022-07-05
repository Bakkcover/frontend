import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  form = new FormGroup({
    "title": new FormControl("", Validators.required),
    "author": new FormControl(""),
    "publisher": new FormControl(""),
    "details": new FormControl(""),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.form.controls.title.value);
  }
}
