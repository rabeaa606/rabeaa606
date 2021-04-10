import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';

import { ApiUsersService } from 'src/app/services/api/api-users.services';
import { AppCurrentUserService } from 'src/app/services/services/app-current-user.service';

import { ILogIn, IUser } from 'src/interfaces';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  loginInput: ILogIn = {
    username: "",
    password: ""
  };

  vlaidlogin: boolean = true;
  Isloged: boolean;

  constructor(private router: Router,
    private _apiuserSvc: ApiUsersService,
    private _appCurrentUserSvc: AppCurrentUserService
  ) { }

  ngOnInit(): void {
    this.router.events
      .subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate') {
          if (!this.loginInput.username && !this.loginInput.password)
            this.vlaidlogin = false;
          else
            this.vlaidlogin = true;
          this.router.navigate(['']);
        }
      });
  }

  async onloginSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.Isloged = false;

      const apiusertemp: IUser = await this._apiuserSvc.ValidUserlogin(this.loginInput);

      if (apiusertemp) this.Isloged = true;
      else this.Isloged = false;

      if (this.Isloged) {
        localStorage.removeItem('username');
        localStorage.removeItem('pass');
        localStorage.removeItem('current-user');
        localStorage.setItem('current-user', JSON.stringify(apiusertemp));
        localStorage.setItem('username', this.loginInput.username);
        localStorage.setItem('pass', this.loginInput.password);

        await this._appCurrentUserSvc.setuser$(apiusertemp);
        this.router.navigate(['/main-page/home-page']);
        this.loginInput.username = "";
        this.loginInput.password = "";
      }
      else {
        this.vlaidlogin = false;
      }
    }
  }
}
