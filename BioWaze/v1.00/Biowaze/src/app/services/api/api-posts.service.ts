import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPost, IUser } from 'src/interfaces';
import { ApiUsersService } from './api-users.services';


@Injectable({
    providedIn: 'root'
})
export class ApiPostsService {
    baseUrl: string = 'http://localhost:4000/apiposts/posts';

    mokPosts: IPost[] = [];
    mokPostUpdated: IPost;

    constructor(private http: HttpClient, private _apiUsersSvc: ApiUsersService) { }

    ///get posts by username
    async getPosts() {
        let curruser: IUser = this._apiUsersSvc.mokLogedUser;
        if (!curruser) {
            curruser = JSON.parse(localStorage.getItem('current-user'));
        }
        if (curruser) {
            this.mokPosts = [];
            await this.getPostsFunc(curruser);
        }
        return Promise.resolve(this.mokPosts);
    }

    async getPostsFunc(curruser: IUser) {
        if (curruser.followeing) {
            for (let i = 0; i < curruser.followeing.length; i++) {
                await this.http.get<IPost[]>(this.baseUrl + "?username=" + curruser.followeing[i].username)
                    .forEach((mapPosts) => {

                        for (let j = 0; j < mapPosts.length; j++)
                            this.mokPosts.push(mapPosts[j]);
                        //sort by date 
                        this.mokPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                    });
            }
        }
    }

    //ipdate post : likes /comments
    async updatePost(post: IPost) {
        await this.http.put<IPost>(this.baseUrl + "/" + post._id, post)
            .forEach((mapPost) => {
                this.mokPostUpdated = mapPost;
            });
        return Promise.resolve(this.mokPostUpdated);
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            let errMessage = error.error.message;
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }
}
