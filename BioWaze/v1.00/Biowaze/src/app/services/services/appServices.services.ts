import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import _ from 'lodash';

import { ILogIn, IUser } from 'src/interfaces';
import { PostsService } from './app-posts.services';
import { MyPostsService } from './app-my-posts.services';
import { AllUsersService } from './app-all-users.services';
import { ApiUsersService } from '../api/api-users.services';
import { AppCurrentUserService } from './app-current-user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private router: Router,
        private _postsSvc: PostsService,
        private _mypostsSvc: MyPostsService,
        private _allUsersSvc: AllUsersService,
        private _apiuserSvc: ApiUsersService,
        private _appCurrentUserSvc: AppCurrentUserService
    ) { }

    async loadData() {
        await this.getUserInfo();
    }

    private async getUserInfo() {
        const usernamee = localStorage.getItem('username');
        const pass = localStorage.getItem('pass');

        if (usernamee) {
            const loginInput: ILogIn = {
                username: usernamee,
                password: pass
            }
            await this._appCurrentUserSvc.setuser$(await this._apiuserSvc.ValidUserlogin(loginInput));

            this._appCurrentUserSvc.user$.value;
            await this.data();
            //this.router.navigate(['/main-page/home-page']);
        }
    }

    private async data() {
        await this._mypostsSvc.init();
        await this._postsSvc.init();
        await this._allUsersSvc.init();
    }
}