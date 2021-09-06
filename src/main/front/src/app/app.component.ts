import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front';

  constructor(public authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.authFromSession();
  }

  logout() {
    this.authService.logout();
    location.reload();
  }
}
