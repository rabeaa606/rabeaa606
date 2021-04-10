import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


import _ from 'lodash';
import { ApiPosts, IPost, IUser } from 'src/interfaces';
import { ApiPostsService } from '../api/api-posts.service';
import { ApiMyPostsService } from '../api/api-my-posts.services';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    private _post$ = new BehaviorSubject<IPost[]>([]);

    get posts$(): BehaviorSubject<IPost[]> {
        return this._post$;
    }

    private _reqpost$ = new BehaviorSubject<IPost[]>([]);

    get reqpost$(): BehaviorSubject<IPost[]> {
        return this._reqpost$;
    }

    constructor(
        private _apipostsservice: ApiPostsService,
        private _apireqpostsservice: ApiMyPostsService) { }

    async init() {
        ///geting data as promise 
        //have to send followingb usernames

        const apipoststemp: IPost[] = await this._apipostsservice.getPosts();

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
        this._post$ = new BehaviorSubject<IPost[]>([]);
        this._post$.next(mokPosts);
        this._post$ = _.cloneDeep(this._post$);
    }

    async initreqPosts(reqUser: string) {
        ///geting data as promise 
        //have to send followingb usernames
        const apipoststemp: IPost[] = await this._apireqpostsservice.getPosts(reqUser);

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
        this._reqpost$ = new BehaviorSubject<IPost[]>([]);
        this._reqpost$.next(mokPosts);
        this._reqpost$ = _.cloneDeep(this._reqpost$);
    }
}