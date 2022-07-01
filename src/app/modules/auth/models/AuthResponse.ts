export class AuthResponse {
  public success:boolean;
  public errorMessage?:string;

  constructor(success:boolean, errorMessage?:string) {
    this.success = success;
    this.errorMessage = errorMessage;
  }
}
