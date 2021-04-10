import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';

import { ApiPostsService } from 'src/app/services/api/api-posts.service';
import { IPost } from 'src/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postCard: IPost;
  likesList: Array<{ username: string }>;
  comments: Array<{ username: string; content: string; }>;

  showLikes = false;
  showComments = false;

  @Input() set post(inputPost: IPost) {
    this.postCard = _.cloneDeep(inputPost);
    this.likesList = _.cloneDeep(inputPost.likes);
    this.comments = _.cloneDeep(inputPost.comments);
  }

  constructor(private _apiPostsSvc: ApiPostsService) { }

  ngOnInit() { }

  postLiked(newLikePressed: Array<{ username: string }>) {
    this.postCard.likes = _.cloneDeep(newLikePressed);
    this.updatePostData();
  }

  postcommented(newComment: Array<{ username: string; content: string; }>) {
    this.postCard.comments = _.cloneDeep(newComment);
    this.updatePostData();
  }

  async updatePostData() {
    this.postCard = _.clone(await this._apiPostsSvc.updatePost(this.postCard));
  }

  likesListClicked() {
    this.showLikes = !this.showLikes;
  }

  commentsListClicked() {
    this.showComments = !this.showComments;
  }
}
