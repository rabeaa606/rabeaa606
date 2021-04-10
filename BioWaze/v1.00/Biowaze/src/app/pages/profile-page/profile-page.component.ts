import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiUsersService } from 'src/app/services/api/api-users.services';
import { AppCurrentUserService } from 'src/app/services/services/app-current-user.service';
import { MyPostsService } from 'src/app/services/services/app-my-posts.services';
import { PostsService } from 'src/app/services/services/app-posts.services';
import { IPost, IUser } from 'src/interfaces';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  i: number;
  currentUser: IUser;
  requestedUsername: string;

  posts: IPost[] = [];
  Userposts: IPost[] = [];

  currentUserRequested: boolean;
  isInFollowing: boolean;

  requestedUser: IUser = {
    username: "",
    password: "",
    dateofBirth: null,
    fname: "",
    lname: "",
    location: "",
    job: "",
    sex: "",
    isDoctor: "",
    email: ""
  };


  constructor(
    private _postSvc: PostsService,
    private _mypostSvc: MyPostsService,
    private _apiUsersSvc: ApiUsersService,
    private _Activatedroute: ActivatedRoute,
    private _apicurrUserSvc: AppCurrentUserService,
    private _appCurrentUserSvc: AppCurrentUserService) {
  }

  async ngOnInit() {
    this.currentUser = await this._appCurrentUserSvc.loadAfterRefresh();;

    this._Activatedroute.paramMap.subscribe(params => {
      this.requestedUsername = params.get('username');
    });

    await this.checkrequestedUser();
    /// post of requsted user
  }

  async checkrequestedUser() {
    this.posts = [];
    switch (localStorage.getItem('username')) {

      case this.requestedUsername: {
        this.currentUserRequested = true;
        this.isInFollowing = true; //not matter

        // this.requestedUser.username = get reqUserData();
        this.posts = this._mypostSvc.mypost$.value;
        this.requestedUser = this._apicurrUserSvc.user$.value;
        break;
      }

      default: {
        this.currentUserRequested = false;
        await this._postSvc.initreqPosts(this.requestedUsername);

        this.Userposts = this._postSvc.reqpost$.value;
        this.requestedUser = await this.getUserDetails(this.requestedUsername);

        this.isInFollowing = false;
        for (let i = 0; i < this._apicurrUserSvc.user$.value.followeing.length; i++)
          if (this._apicurrUserSvc.user$.value.followeing[i].username.match(this.requestedUser.username)) {
            this.isInFollowing = true;
            break;
          }
        break;
      }
    }
  }

  async getUserDetails(requestedUsername: string): Promise<IUser> {
    const requser: IUser = await this._apiUsersSvc.getUser(requestedUsername);
    return requser;
  }

  refresh(): void {
    window.location.reload();
  }
}


