import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import _ from 'lodash';

import { IUser } from 'src/interfaces';


@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {


  friendsList: IUser[];

  followType: boolean = true; //true =followers
  //flase=following  

  @Input() set friends(friends: IUser[]) {
    this.friendsList = [];
    this.friendsList = _.cloneDeep(friends);
  }
  @Input() type: 'following' | 'followers';

  @Output() onRemoveFriend = new EventEmitter<{ list: IUser[], target: string }>();

  constructor() { }

  ngOnInit() {

    switch (this.type) {
      case 'followers': {
        this.followType = true;
        break;
      }
      case 'following': {
        this.followType = false;
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }


  onReomve(username: string, index: number) {
    this.friendsList.splice(this.friendsList.indexOf(this.friendsList[index]), 1);
    this.onRemoveFriend.emit({ list: this.friendsList, target: username });
  }
  onScroll() { }

}
