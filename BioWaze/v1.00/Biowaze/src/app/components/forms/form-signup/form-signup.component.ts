import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiUsersService } from 'src/app/services/api/api-users.services';
import { ISignUp } from 'src/interfaces';

@Component({
  selector: 'app-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.scss']
})
export class FormSignupComponent implements OnInit {

  passwordConfirm: boolean = true;
  uservalidateConfirm: boolean = true;
  IsValid: boolean;

  signUpInput: ISignUp = {
    username: "",
    password: "",
    confirm_password: "",
  };

  constructor(private router: Router,
    private _apiuserSvc: ApiUsersService) { }

  ngOnInit() {
  }

  async onSigninSubmit(signinForm: NgForm) {

    if (this.signUpInput.password == this.signUpInput.confirm_password)
      this.passwordConfirm = true;
    else
      this.passwordConfirm = false;

    if (signinForm.valid && this.passwordConfirm) {
      this.IsValid = false;
      this.IsValid = await this._apiuserSvc.ValidUsername(this.signUpInput);

      if (this.IsValid) {
        this.router.navigate(['/signup-page', this.signUpInput.username, this.signUpInput.password]);
      }
      else {
        this.uservalidateConfirm = false;
      }
    }
  }
}
