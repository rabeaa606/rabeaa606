import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

import { AllUsersService } from 'src/app/services/services/app-all-users.services';
import { AppCurrentUserService } from 'src/app/services/services/app-current-user.service';
import { ApiFriendShipService } from 'src/app/services/api/api-friendship.services';
import { IUser } from 'src/interfaces';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  allUsers: IUser[] = [];
  currentUser: IUser;
  mobile_Mode: boolean;

  loadedData: boolean = AppCurrentUserService.loaded;

  constructor(
    private _allUsersSvc: AllUsersService,
    private _appCurrentUserSvc: AppCurrentUserService,
    private _apifriendshipSvc: ApiFriendShipService,
  ) { }

  async ngOnInit() {
    this.currentUser = await this._appCurrentUserSvc.loadUsersAfterRefresh();;

    if (window.screen.width > 767)
      this.mobile_Mode = false;
    else
      this.mobile_Mode = true;;


    this.filtterUsers();
  }

  filtterUsers() {
    this.currentUser = this._appCurrentUserSvc.user$.value;
    this.allUsers = _.cloneDeep(this._allUsersSvc.users$.value);

    if (this.currentUser && this.allUsers) {
      for (let i = 0; i < this.allUsers.length; i++) {
        if (this.allUsers[i].username === this.currentUser.username)
          this.allUsers.splice(this.allUsers.indexOf(this.allUsers[i]), 1);
      }

      if (this.currentUser.followeing) {

        for (let j = 0; j < this.currentUser.followeing.length; j++)
          for (let i = 0; i < this.allUsers.length; i++) {
            {
              if (this.currentUser.followeing[j].username === this.allUsers[i].username) {
                this.allUsers.splice(this.allUsers.indexOf(this.allUsers[i]), 1);
              }
            }
          }
      }
    } else {
      this.loadedData = false;

    }
    //this.allUsers  contain all users on the app except current user and his following list  }
  }



  // when user folloed another user 
  async onNewFollow(index: number) {
    let targetUser: IUser = null;
    targetUser = this.allUsers[index];
    setTimeout(() => {
      this.currentUser.followeing.push({ username: this.allUsers[index].username });
      localStorage.removeItem('current-user');
      localStorage.setItem('current-user', JSON.stringify(this.currentUser));
      this.allUsers.splice(this.allUsers.indexOf(this.allUsers[index]), 1);
    }, 3000);

    await this._apifriendshipSvc.newFollow(this.currentUser, targetUser);

  }
}
