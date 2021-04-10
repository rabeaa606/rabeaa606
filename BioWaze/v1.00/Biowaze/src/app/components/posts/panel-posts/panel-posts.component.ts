import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';

import { IPost } from 'src/interfaces';


@Component({
  selector: 'app-panel-posts',
  templateUrl: './panel-posts.component.html',
  styleUrls: ['./panel-posts.component.scss']
})
export class PanelPostsComponent implements OnInit {

  @Input() posts?: IPost[];

  constructor() { }

  ngOnInit() { }

  onNewPost(newPost: IPost) {
    const newpostsList = _.cloneDeep(this.posts);
    newpostsList.push(newPost);

    this.posts = _.cloneDeep(newpostsList);
    this.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    this.ngOnInit();
  }
}
