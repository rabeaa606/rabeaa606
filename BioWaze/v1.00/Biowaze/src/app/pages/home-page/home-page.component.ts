import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

import { AppCurrentUserService } from 'src/app/services/services/app-current-user.service';
import { PostsService } from 'src/app/services/services/app-posts.services';
import { IPost, IUser } from 'src/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  i: number;
  posts: IPost[] = [];
  currentUser: IUser;

  constructor(private _postSvc: PostsService,
    private _appCurrentUserSvc: AppCurrentUserService) { }

  async ngOnInit() {
    this.currentUser = await this._appCurrentUserSvc.loadAfterRefresh();;
    this.posts = this._postSvc.posts$.value;
  }
}
