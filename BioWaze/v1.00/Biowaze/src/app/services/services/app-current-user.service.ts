import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import _ from 'lodash';

import { ILogIn, IUser } from 'src/interfaces';
import { PostsService } from './app-posts.services';
import { MyPostsService } from './app-my-posts.services';
import { AllUsersService } from './app-all-users.services';
import { ApiUsersService } from '../api/api-users.services';

@Injectable({
    providedIn: 'root'
})
export class AppCurrentUserService {

    currentUser: IUser;

    public static loaded: boolean = false;
    private _user$ = new BehaviorSubject<IUser>(null);

    get user$(): BehaviorSubject<IUser> {
        return this._user$;
    }

    async setuser$(logedUser: IUser) {
        AppCurrentUserService.loaded = true;
        this._user$.next(logedUser);
        this._user$ = _.clone(this._user$);
        if (logedUser)
            await this.loadDataFromServer();
    }

    constructor(
        private _postsSvc: PostsService,
        private _mypostsSvc: MyPostsService,
        private _allUsersSvc: AllUsersService,
        private _apiuserSvc: ApiUsersService,
        private _appCurrentUserSvc: AppCurrentUserService
    ) { }

    async loadDataFromServer() {
        console.log("loading data");

        await this._mypostsSvc.init();
        await this._postsSvc.init();
        await this._allUsersSvc.init();
    }

    async loadUsersAfterRefresh() {
        this.currentUser = await this.user$.value;
        if (!this.currentUser) {
            this.currentUser = JSON.parse(localStorage.getItem('current-user'));

            if (this.currentUser) {
                AppCurrentUserService.loaded = true;
                this._user$.next(this.currentUser);
                this._user$ = _.clone(this._user$);
                await this._allUsersSvc.init();
            }
        }
        return this.currentUser;
    }

    async loadAfterRefresh() {
        this.currentUser = await this.user$.value;
        if (!this.currentUser) {
            this.currentUser = JSON.parse(localStorage.getItem('current-user'));

            if (this.currentUser) {

                await this.setuser$(this.currentUser);
            }
        }
        return this.currentUser;
    }
}


// async loadData() {
    //     await this.getUserInfo();
    // }
    // async getUserInfo() {
    //     const usernamee = localStorage.getItem('username');
    //     const pass = localStorage.getItem('pass');

    //     if (usernamee) {

    //         const loginInput: ILogIn = {
    //             username: usernamee,
    //             password: pass
    //         }
    //         await this.setuser$(await this._apiuserSvc.ValidUserlogin(loginInput));
    //     }
    // }