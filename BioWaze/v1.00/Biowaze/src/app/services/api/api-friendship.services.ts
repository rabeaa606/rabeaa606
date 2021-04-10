import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from 'src/interfaces';



@Injectable({
    providedIn: 'root'
})
export class ApiFriendShipService {
    baseUrl: string = 'http://localhost:4000/apifreindship';

    mokfollowersList: Array<{ username: string }> = [];
    mokfolloweingList: Array<{ username: string }> = [];
    mokUserListsUpdated: IUser;

    constructor(private http: HttpClient) { }

    //update unfollow : user:followers /  username:following
    async unfollowupdate(currUser: IUser, updatedList: Array<{ username: string }>, trarget: any) {
        const apifriendship: ApiFriendShips = {
            user: currUser.username,
            newList: updatedList,
            target: trarget.username
        }
        // update user followers list
        await this.http.put<ApiFriendShips>(this.baseUrl + "/unfollow/" + currUser._id, apifriendship)
            .forEach((mapUser) => {
                this.mokfollowersList = mapUser.newList;
            });

        // update target user following list
        const apicurrentuser: ApiTargetUser = { username: currUser.username };
        await this.http.put<ApiTargetUser>(this.baseUrl + "/rmvFromtargetfollowes" + "?username=" + trarget.username, apicurrentuser)
            .forEach((mapUser) => {
                const TartUser = mapUser;
                console.log(TartUser);
            });
        return Promise.resolve(this.mokfolloweingList);
    }

    //update removefollowerupdate : user:followeing /  username:followers
    // when user remove another user from following him 
    async removeFollower(currUser: IUser, updatedList: Array<{ username: string }>, trarget: any) {
        const apifriendship: ApiFriendShips = {
            user: currUser.username,
            newList: updatedList,
            target: trarget.username
        }
        // update user following list
        await this.http.put<ApiFriendShips>(this.baseUrl + "/remfollower/" + currUser._id, apifriendship)
            .forEach((mapUser) => {
                this.mokfolloweingList = mapUser.newList;
            });

        // update target user followers list
        const apicurrentuser: ApiTargetUser = { username: currUser.username };
        await this.http.put<ApiTargetUser>(this.baseUrl + "/rmvFromtargetfollowing" + "?username=" + trarget.username, apicurrentuser)
            .forEach((mapUser) => {
                const TartUser = mapUser;
                console.log(TartUser);
            });
        return Promise.resolve(this.mokfolloweingList);
    }



    async newFollow(currUser: IUser, trarget: IUser) {
        const apifriendship: ApiFriendShips = {
            user: currUser.username,
            newList: currUser.followeing,
            target: trarget.username
        }
        console.log(currUser.followeing);

        // update user following list
        await this.http.put<ApiFriendShips>(this.baseUrl + "/updateFollowing/" + currUser._id, apifriendship)
            .forEach((mapUser) => {
                this.mokfolloweingList = mapUser.newList;
                console.log(mapUser);

            });

        // update target user followers list
        const apicurrentuser: ApiTargetUser = { username: currUser.username };
        await this.http.put<ApiTargetUser>(this.baseUrl + "/addToTargetFollowers" + "?username=" + trarget.username, apicurrentuser)
            .forEach((mapUser) => {
                const TartUser = mapUser;
                console.log(TartUser);
            });
        return Promise.resolve(this.mokfolloweingList);
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            let errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Node.js server error');
    }
}


export interface ApiFriendShips {
    user: string;
    newList: Array<{ username: string }>;
    target: string;
}
export interface ApiTargetUser {
    username: string;
}