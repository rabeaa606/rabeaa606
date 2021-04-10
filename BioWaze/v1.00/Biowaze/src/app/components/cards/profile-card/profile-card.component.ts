import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/interfaces';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  @Input() IsCurrentUser: boolean;
  @Input() isInFollowing: boolean;
  @Input() user: IUser;

  constructor() { }

  ngOnInit() { }

}
