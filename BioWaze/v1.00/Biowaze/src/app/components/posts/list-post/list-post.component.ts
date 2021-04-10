import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';

import { AllUsersService } from 'src/app/services/services/app-all-users.services';
import { IPost, IUser } from 'src/interfaces';



@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  postssList: IPost[];
  allUsers: IUser[];

  @Input() set posts(posts: IPost[]) {
    this.postssList = [];
    this.allUsers = this._allUsersSvc.users$.value;
    this.postssList = _.cloneDeep(posts);

    for (let i = 0; i < this.allUsers.length; i++)
      for (let j = 0; j < this.postssList.length; j++)
        if (this.allUsers[i].username === this.postssList[j].username)
          this.postssList[j].userimage = this.allUsers[i].image;
  }


  constructor(private _allUsersSvc: AllUsersService,) { }

  ngOnInit() { }

  onScroll() { }

}
