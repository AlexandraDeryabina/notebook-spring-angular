import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../model/LoginRequest";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  form:FormGroup;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.form = this.fb.group({
      login: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    const val = this.form.value;

    if (val.login && val.password) {
      let loginRequest = new LoginRequest(val.login, val.password);
      this.authService.auth(loginRequest)
        .subscribe(
          () => {
            console.log("User is logged in");
            location.reload()
          },
          error => {
            console.log(error);
          }
        );
    }
  }

}
