import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

import { ApiFriendShipService } from 'src/app/services/api/api-friendship.services';
import { AppCurrentUserService } from 'src/app/services/services/app-current-user.service';
import { AllUsersService } from 'src/app/services/services/app-all-users.services';
import { IUser } from 'src/interfaces';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit {

  currentUser: IUser;
  following: IUser[] = [];
  followers: IUser[] = [];
  allUsers: IUser[];

  followingType = "following";
  followersType = "followers";

  followType: boolean = true; //true =followers,flase=following
  username_List: Array<{ username: string }> = [];


  constructor(private _allUsersSvc: AllUsersService,
    private _apiFriendShipSvc: ApiFriendShipService,
    private _appCurrentUserSvc: AppCurrentUserService) { }

  async ngOnInit() {
    await this.getFriend();
  }


  async getFriend() {
    await this._appCurrentUserSvc.loadAfterRefresh();;

    this.currentUser = this._appCurrentUserSvc.user$.value;
    this.allUsers = this._allUsersSvc.users$.value;

    for (let i = 0; i < this.allUsers.length; i++) {
      for (let j = 0; j < this.currentUser.followeing.length; j++)
        if (this.allUsers[i].username === this.currentUser.followeing[j].username)
          this.following.push(this.allUsers[i])


      for (let j = 0; j < this.currentUser.followers.length; j++)
        if (this.allUsers[i].username === this.currentUser.followers[j].username)
          this.followers.push(this.allUsers[i])
    }
  }

  followersBtn() {
    this.followType = true;
  }

  followingBtn() {
    this.followType = false;
  }

  // when user remove another user from following him 
  async onReomveFollower(output: { list: IUser[], target: string }) {
    this.followers = _.clone(output.list);
    this.username_List = []

    for (let i = 0; i < this.followers.length; i++)
      this.username_List.push({ username: this.followers[i].username });

    await this._apiFriendShipSvc.removeFollower(this.currentUser, this.username_List, output.target);
  }

  // when user unfollow another user 
  async onReomveFollowing(output: { list: IUser[], target: string }) {
    this.following = _.clone(output.list);
    this.username_List = []

    for (let i = 0; i < this.following.length; i++)
      this.username_List.push({ username: this.following[i].username });

    await this._apiFriendShipSvc.unfollowupdate(this.currentUser, this.username_List, output.target);
  }
}
