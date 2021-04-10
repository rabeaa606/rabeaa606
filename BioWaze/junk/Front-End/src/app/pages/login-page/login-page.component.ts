import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  IsLogin: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  logInFunc() {
    this.IsLogin = !this.IsLogin;
  }

}
