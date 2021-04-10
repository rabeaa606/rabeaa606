import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/interfaces';
import _ from 'lodash';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  usersList: IUser[];

  @Input() set users(users: IUser[]) {
    this.usersList = [];
    this.usersList = _.cloneDeep(users);
  }

  @Output() onRemoveFromAllUsers = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  onNewFollow(user: IUser, index: number) {
    setTimeout(() => {
      this.usersList.splice(this.usersList.indexOf(this.usersList[index]), 1);
    }, 3000);
    this.onRemoveFromAllUsers.emit(index);
  }

  onScroll() { }

}
