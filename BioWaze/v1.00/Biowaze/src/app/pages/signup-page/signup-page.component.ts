import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiUsersService } from 'src/app/services/api/api-users.services';
import { AppCurrentUserService } from 'src/app/services/services/app-current-user.service';
import { IUser } from 'src/interfaces';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  IsSigned: boolean;
  validFname: boolean = true;
  validLname: boolean = true;
  validJob: boolean = true;
  validLocation: boolean = true;
  validIsDoctor: boolean = true;
  validSex: boolean = true;
  validDate: boolean = true;
  validEmail: boolean = true;

  errorMessage: string;

  newUser: IUser = {
    username: "",
    password: "",
    fname: "",
    lname: "",
    location: "",
    job: "",
    sex: "",
    isDoctor: "",
    dateofBirth: null,
    email: "",
  };

  constructor(private router: Router,
    public _Activatedroute: ActivatedRoute,
    private _apiuserSvc: ApiUsersService, private _appCurrentUserSvc: AppCurrentUserService
  ) { }

  ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.newUser.username = params.get('username');
      this.newUser.password = params.get('password');
    });
  }

  async sigiUp() {

    //check validation
    if (this.newUser.fname == "") this.validFname = false;
    else this.validFname = true;
    if (this.newUser.lname == "") this.validLname = false;
    else this.validLname = true;
    this.validEmail = this.validateEmail(this.newUser.email);
    if (this.newUser.location == "") this.validLocation = false;
    else this.validLocation = true;
    if (this.newUser.job == "") this.validJob = false;
    else this.validJob = true;
    if (this.newUser.isDoctor == "") this.validIsDoctor = false;
    else this.validIsDoctor = true;
    if (this.newUser.sex == "") this.validSex = false;
    else this.validSex = true;
    if (this.newUser.dateofBirth == null) this.validDate = false;
    else this.validDate = true;

    if (this.validFname
      && this.validLname
      && this.validEmail
      && this.validLocation
      && this.validJob
      && this.validIsDoctor
      && this.validSex
      && this.validDate
    ) {
      this.IsSigned = false;
      const apiusertemp: IUser = await this._apiuserSvc.insretUser(this.newUser);
      apiusertemp.followeing = [];
      apiusertemp.followers = [];

      if (apiusertemp) this.IsSigned = true;
      else this.IsSigned = false;

      if (this.IsSigned) {
        localStorage.setItem('username', this.newUser.username);
        localStorage.removeItem('current-user');
        localStorage.setItem('current-user', JSON.stringify(apiusertemp));

        await this._appCurrentUserSvc.setuser$(apiusertemp);

        this.router.navigate(['/main-page']);
      }
      else {
        this.validFname = false;
        this.validEmail = false;
        this.validLocation = false;
        this.validJob = false;
        this.validIsDoctor = false;
        this.validSex = false;
        this.validDate = false;
      }
    }
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
