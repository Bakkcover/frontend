import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoggingService} from "./services/logging/logging.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    LoggingService
  ]
})
export class SharedModule { }
