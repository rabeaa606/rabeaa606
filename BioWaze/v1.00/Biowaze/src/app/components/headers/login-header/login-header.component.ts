import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent implements OnInit {


  @Output() isLoginEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  logInFunc() {
    this.isLoginEvent.emit(true);
  }

  signUpFunc() {
    this.isLoginEvent.emit(false);
  }
}
