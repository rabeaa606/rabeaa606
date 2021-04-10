import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/interfaces';
import _ from 'lodash';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  userCard: IUser;
  isFollowClicked: boolean = false;
  spinner: boolean = false;

  @Input() set user(inputUser: IUser) {
    this.userCard = _.clone(inputUser);
  }
  @Output() newLikefollowPressed = new EventEmitter<IUser>();

  constructor() { }

  ngOnInit() {
  }

  async followClicked() {

    this.spinner = true;
    setTimeout(() => {
      this.isFollowClicked = true;
      this.spinner = false;

      this.newLikefollowPressed.emit(this.userCard);
      //CAL API
    }, 5000);

  }

}
