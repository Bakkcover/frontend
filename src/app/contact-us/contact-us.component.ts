import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  form = new FormGroup({
    "firstName": new FormControl("Test", Validators.required),
    "lastName": new FormControl("User", Validators.required),
    "email": new FormControl("user@example.com", Validators.required),
    "message": new FormControl("Please help my dad is-", Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    let firstName:string = this.form.controls.firstName.value?? "VALUE MISSING";
    let lastName:string = this.form.controls.lastName.value?? "VALUE MISSING";
    let email:string = this.form.controls.email.value?? "VALUE MISSING";
    let message:string = this.form.controls.message.value?? "VALUE MISSING";

    // TODO: replace with actual logger
    console.log(`
      ===== SUBMITTED CONTACT FORM =====
      ${firstName}
      ${lastName}
      ${email}
      ${message}
    `)

    // TODO: add actual logic to send message
  }
}
