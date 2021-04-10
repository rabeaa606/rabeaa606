import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


import _ from 'lodash';
import { ApiPosts, IPost, IUser } from 'src/interfaces';
import { ApiMyPostsService } from '../api/api-my-posts.services';
import { AppCurrentUserService } from './app-current-user.service';

@Injectable({
    providedIn: 'root'
})
export class MyPostsService {

    currentUser: IUser;
    private _mypost$ = new BehaviorSubject<IPost[]>([]);

    get mypost$(): BehaviorSubject<IPost[]> {
        return this._mypost$;
    }

    constructor(
        private _apimypostsservice: ApiMyPostsService,
    ) { }

    async init() {
        ///geting data as promise 
        const apipoststemp: IPost[] = await this._apimypostsservice.getPosts(localStorage.getItem('username'));

        const posts: IPost[] = apipoststemp.map(
            L => {
                return <IPost>{
                    _id: L._id,
                    username: L.username,
                    content: L.content,
                    date: L.date,
                    tags: L.tags,
                    likes: L.likes,
                    comments: L.comments,
                    shares: L.shares,
                    userimage: L.userimage
                }
            });

        const mokPosts: IPost[] = posts;
        this._mypost$.next(mokPosts);
        this._mypost$ = _.clone(this._mypost$);
    }
}