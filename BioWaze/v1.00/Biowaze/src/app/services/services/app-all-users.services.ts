import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


import _ from 'lodash';
import { IUser } from 'src/interfaces';
import { ApiUsersService } from '../api/api-users.services';

@Injectable({
    providedIn: 'root'
})
export class AllUsersService {

    private _users$ = new BehaviorSubject<IUser[]>([]);

    get users$(): BehaviorSubject<IUser[]> {
        return this._users$;
    }

    constructor(
        private _apiusersservice: ApiUsersService) { }

    async init() {

        ///geting data as promise 
        //have to send followingb usernames
        const apiuserstemp: IUser[] = await this._apiusersservice.getUsers();

        const users: IUser[] = apiuserstemp.map(
            L => {
                return <IUser>{
                    _id: L._id,
                    username: L.username,
                    password: L.password,
                    fname: L.fname,
                    lname: L.lname,
                    location: L.location,
                    job: L.job,
                    sex: L.sex,
                    isDoctor: L.isDoctor,
                    dateofBirth: L.dateofBirth,
                    email: L.email,
                    followers: L.followers,
                    followeing: L.followeing,
                    image: L.image
                }
            });

        const mokUsers: IUser[] = users;

        this._users$.next(mokUsers);
        this._users$ = _.clone(this._users$);
    }
}