import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ApiMyPostsService } from 'src/app/services/api/api-my-posts.services';
import { AppCurrentUserService } from 'src/app/services/services/app-current-user.service';
import { IPost, IUser } from 'src/interfaces';

@Component({
  selector: 'app-make-post',
  templateUrl: './make-post.component.html',
  styleUrls: ['./make-post.component.scss']
})
export class MakePostComponent implements OnInit {

  form = new FormGroup({
    postContent: new FormControl(),
    postTags: new FormControl(),
  });

  get postContent(): any { return this.form.get('postContent'); }
  get postTags(): any { return this.form.get('postTags'); }

  newPost: IPost;
  currentUser: IUser;
  myDate = new Date();
  tagsList: Array<{ tag: string }> = [];
  errorMessage: string;

  @Output() makedNewPost = new EventEmitter<IPost>();

  constructor(private _apiMyPostsSvc: ApiMyPostsService, private _appcurusersSvc: AppCurrentUserService) { }

  ngOnInit() {
    this.currentUser = this._appcurusersSvc.user$.value;
    if (!this.currentUser)
      this.currentUser = JSON.parse(localStorage.getItem('current-user'));
  }

  async onSubmit() {
    // TODO: Use EventEmitter with form value
    const newPost: IPost = {
      username: this.currentUser.username,
      content: this.postContent.value,
      date: this.myDate,
      tags: this.tagsList,
      likes: [],
      comments: [],
      shares: [],
      userimage: this.currentUser.image
    };

    this.newPost = newPost;
    this.makedNewPost.emit(this.newPost);

    const newPostInserted = await this._apiMyPostsSvc.insretPost(this.newPost)
      .subscribe((post: IPost) => {
        if (post) {
          console.log("inserted post " + post);
        }
        else {
          this.errorMessage = 'Unable to add post';
        }
      },
        (err) => console.log(err)
      );
  }

  addNewTag(newTag: string) {
    const addedTag: { tag: string } = { tag: newTag.toString() };
    this.tagsList.push(addedTag)
    this.clearInputTags();
  }

  clearInputTags() { this.postTags.reset(); }
}
