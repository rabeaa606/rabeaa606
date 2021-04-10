import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-post-likes',
  templateUrl: './post-likes.component.html',
  styleUrls: ['./post-likes.component.scss']
})
export class PostLikesComponent implements OnInit {

  currentUser: string;
  postLikesList: Array<{ username: string }>;

  isLiked: boolean = false;
  index: number;

  @Input() set likesList(list: Array<{ username: string }>) {
    this.postLikesList = list;
  }
  @Output() newLikePressed = new EventEmitter<Array<{ username: string }>>();

  constructor() { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('username');
    for (let i = 0; i < this.postLikesList.length; i++)
      if (this.currentUser.includes(this.postLikesList[i].username)) {
        this.isLiked = true;
        break;
      }
  }

  likeClicked() {
    const like: { username: string } = { username: this.currentUser };
    this.postLikesList.unshift(like);

    const mokLikesList: Array<{ username: string }> = this.postLikesList;
    this.postLikesList = _.clone(mokLikesList);

    this.isLiked = true;
    this.newLikePressed.emit(this.postLikesList);
  }

  deslikeClicked() {
    for (let i = 0; i < this.postLikesList.length; i++)
      if (this.currentUser.includes(this.postLikesList[i].username)) {
        this.postLikesList.splice(this.postLikesList.indexOf(this.postLikesList[i]), 1);
        break;
      }

    const mokLikesList: Array<{ username: string }> = this.postLikesList;
    this.postLikesList = _.clone(mokLikesList);

    this.isLiked = false;
    this.newLikePressed.emit(this.postLikesList);
  }
}
