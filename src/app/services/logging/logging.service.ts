import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  public logInfo(message:string): void {
    console.log(`[INFO] ${message}`);
  }

  public logError(message:string): void {
    console.log(`[ERROR] ${message}`);
  }

  public logSuccess(message:string): void {
    console.log(`[SUCCESS] ${message}`);
  }
}
