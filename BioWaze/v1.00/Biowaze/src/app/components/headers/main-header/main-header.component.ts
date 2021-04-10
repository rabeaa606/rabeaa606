import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppCurrentUserService } from 'src/app/services/services/app-current-user.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor(private router: Router, private _appCurrentUserSvc: AppCurrentUserService) { }

  ngOnInit() { }

  async logout() {

    localStorage.removeItem('username');
    localStorage.removeItem('pass');
    localStorage.removeItem('current-user');
    localStorage.removeItem('user-img');

    this._appCurrentUserSvc.setuser$(null);
    this.router.navigate(['/']);

  }
}
