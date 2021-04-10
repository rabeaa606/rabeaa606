import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import _ from 'lodash';

import { IUser } from 'src/interfaces';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnInit {

  inFriend: IUser;

  @Input() set friend(friend: IUser) {
    this.inFriend = null;
    this.inFriend = _.cloneDeep(friend);
  }
  @Input() followType: boolean;

  @Output() freiendRemove = new EventEmitter<IUser>();

  constructor() { }

  ngOnInit() { }

  removeFriend(remfriend: IUser) {
    this.freiendRemove.emit(remfriend);
  }

}
