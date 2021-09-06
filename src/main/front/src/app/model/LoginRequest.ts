import {Expose} from "class-transformer";
import {AbstractControl, ValidationErrors} from "@angular/forms";

export class LoginRequest {
  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }


  @Expose()
  login: (() => void) | string;

  @Expose()
  password: (string | ((control: AbstractControl) => (ValidationErrors | null)))[] | string;

}
