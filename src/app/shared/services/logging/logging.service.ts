import { Injectable } from '@angular/core';
import {LoggingSeverity} from "./loggingSeverity";

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  public log(message:string, severity?:LoggingSeverity) {

    switch (severity) {
      case LoggingSeverity.SUCCESS:
        this.logSuccess(message);
        break;
      case LoggingSeverity.ERROR:
        this.logError(message);
        break;
      case LoggingSeverity.INFO:
        this.logInfo(message);
        break;
      default:
        this.logInfo(message);
    }
  }

  private logInfo(message:string): void {
    console.log(`[INFO] ${message}`);
  }

  private logError(message:string): void {
    console.log(`[ERROR] ${message}`);
  }

  private logSuccess(message:string): void {
    console.log(`[SUCCESS] ${message}`);
  }
}
