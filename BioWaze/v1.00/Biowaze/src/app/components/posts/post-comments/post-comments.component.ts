import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import _ from 'lodash';

import { AllUsersService } from 'src/app/services/services/app-all-users.services';
import { IUser } from 'src/interfaces';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {

  formcomment = new FormGroup({
    CommentContent: new FormControl(),
  });

  allUsers: IUser[];
  currentUser: IUser;
  commentsList: Array<{ username: string; content: string; }>;
  ImgList: Array<{ username: string; userimage: string; content: string; }> = [];

  get CommentContent(): any { return this.formcomment.get('CommentContent'); }

  @Input() set comments(comments: Array<{ username: string; content: string; }>) {
    this.commentsList = [];
    this.commentsList = _.cloneDeep(comments);
    for (let i = 0; i < comments.length; i++) {
      this.ImgList.push(
        {
          username: comments[i].username,
          userimage: "",
          content: comments[i].content,
        }
      )
    }

    this.allUsers = this._allUsersSvc.users$.value;
    for (let i = 0; i < this.allUsers.length; i++)
      for (let j = 0; j < this.ImgList.length; j++)
        if (this.allUsers[i].username === this.ImgList[j].username)
          this.ImgList[j].userimage = this.allUsers[i].image;
  }

  @Output() newComment = new EventEmitter<Array<{ username: string; content: string; }>>();

  constructor(private _allUsersSvc: AllUsersService,) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('current-user'));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    const newComment: { username: string; content: string; } = {
      username: this.currentUser.username,
      content: this.CommentContent.value
    };

    const newCommentwithimg: { username: string; userimage: string; content: string; } = {
      username: this.currentUser.username,
      userimage: this.currentUser.image,
      content: this.CommentContent.value
    };

    this.commentsList.unshift(newComment);
    this.ImgList.unshift(newCommentwithimg);

    const mokCommentsList: Array<{ username: string; content: string; }> = this.commentsList;
    const mokCommentsListwithimg: Array<{ username: string; userimage: string; content: string; }> = this.ImgList;

    this.commentsList = _.clone(mokCommentsList);
    this.ImgList = _.clone(mokCommentsListwithimg);

    this.clearInputComment();
    this.newComment.emit(this.commentsList);

  }

  deleteComment(index: number) {
    this.commentsList.splice(this.commentsList.indexOf(this.commentsList[index]), 1);
    this.newComment.emit(this.commentsList);
  }

  clearInputComment() { this.CommentContent.reset(); }

  onScroll() { }
}
