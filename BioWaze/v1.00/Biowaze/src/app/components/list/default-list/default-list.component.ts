import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppCurrentUserService } from 'src/app/services/services/app-current-user.service';
import { IUser } from 'src/interfaces';

@Component({
  selector: 'app-default-list',
  templateUrl: './default-list.component.html',
  styleUrls: ['./default-list.component.scss']
})
export class DefaultListComponent implements OnInit {
  currentUser: IUser;

  constructor(private router: Router,
    private _appCurrentUserSvc: AppCurrentUserService) { }

  ngOnInit() {
    this.currentUser = this._appCurrentUserSvc.user$.value;
  }

  homePage() {
    this.router.navigate(['/main-page/home-page']);
  }

  profilePage() {
    this.router.navigate(['/main-page/profile-page', localStorage.getItem('username')]);
  }

  friendsPage() {
    this.router.navigate(['/main-page/friends-page']);
  }

  abouUsPage() {
    this.router.navigate(['/main-page/about-page']);
  }

  exit() {
    this.router.navigate(['/main-page/about-page']);
  }
}
