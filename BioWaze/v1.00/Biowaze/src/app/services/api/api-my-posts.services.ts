import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IPost } from 'src/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ApiMyPostsService {
    baseUrl: string = 'http://localhost:4000/apiposts/posts';

    mokPosts: IPost[] = [];

    constructor(private http: HttpClient) { }

    async getPosts(username: string) {
        await this.http.get<IPost[]>(this.baseUrl + "?username=" + username)
            .forEach((mapPosts) => {
                this.mokPosts = mapPosts;
                this.mokPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            });
        return Promise.resolve(this.mokPosts);
    }

    insretPost(post: IPost): Observable<IPost> {
        return this.http.post<IPost>(this.baseUrl, post)
            .pipe(
                map((data) => {
                    return data;
                }),
                catchError(this.handleError)
            );
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
