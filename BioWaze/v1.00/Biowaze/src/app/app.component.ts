import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/interfaces';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Biowaze';
  currentUser: IUser;
  allUsers: IUser[] = [];


  constructor() {

  }
  async ngOnInit() {

    //await this._appSvc.loadData();

  }

}


