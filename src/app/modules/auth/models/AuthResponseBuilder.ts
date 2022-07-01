import {AuthResponse} from "./AuthResponse";

export class AuthResponseBuilder {
  public success?: boolean;
  public errorMessage?: string;

  constructor() {}

  public setSuccess(success:boolean) {
    this.success = success;
  }

  public setErrorMessage(errorMessage:string) {
    this.errorMessage = errorMessage;
  }

  public getResult(): AuthResponse {
    return new AuthResponse(this.success!, this.errorMessage);
  }
}
