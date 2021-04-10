import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ILogIn, ISignUp, IUser } from 'src/interfaces';


@Injectable({
    providedIn: 'root'
})
export class ApiUsersService {
    baseUrl: string = 'http://localhost:4000/apiusers';

    mokUsers: IUser[] = [];
    mokAllUsers: IUser[] = [];
    mokLogedUser: IUser;
    mokreqUser: IUser;

    isValidUsername: boolean;
    isValidSigning: boolean;
    isValidLogin: boolean;
    setImage: boolean

    constructor(private http: HttpClient) { }

    async getUsers() {
        await this.http.get<IUser[]>(this.baseUrl + "/users")
            .forEach((mokAllUsers) => {
                this.mokAllUsers = mokAllUsers;
            });
        return Promise.resolve(this.mokAllUsers);
    }

    getUserLogin(user: IUser): Observable<IUser> {
        return this.http.post<IUser>(this.baseUrl + "/user/login", user)
            .pipe(
                map((data) => {
                    return data;
                }),
                catchError(this.handleError)
            );
    }

    async getUser(username: string) {
        this.mokreqUser = null;
        await this.http.get<IUser>(this.baseUrl + "/userdeatails?username=" + username)
            .forEach((mapUser) => {

                this.mokreqUser = mapUser;
            });
        return Promise.resolve(this.mokreqUser);
    }

    async insretUser(user: IUser) {
        await this.http.post<IUser>(this.baseUrl + "/user/signup/", user)
            .forEach((res) => {
                this.mokLogedUser = null;
                this.mokLogedUser = res;

            });
        return Promise.resolve(this.mokLogedUser);
    }

    async ValidUserlogin(user: ILogIn) {
        await this.http.post<IUser>(this.baseUrl + "/user/login", user)
            .forEach((res) => {
                this.mokLogedUser = null;
                this.mokLogedUser = res;
            });
        if (this.mokLogedUser) {
            // localStorage.setItem("user-img",);
            await this.http.get<any>(this.baseUrl + "/user/getimg/" + this.mokLogedUser._id)
                .forEach((data) => {
                    localStorage.setItem("user-img", data.file);
                });
        }
        return Promise.resolve(this.mokLogedUser);
    }

    async ValidUsername(user: ISignUp) {
        await this.http.post<boolean>(this.baseUrl + "/user/validuser", user)
            .forEach((res) => {
                this.isValidUsername = res
            });
        return this.isValidUsername;
    }

    async setUserImage(user: IUser) {
        await this.http.post<IUser>(this.baseUrl + "/user/img?username=" + user.username, user)
            .forEach((res) => {
                this.mokreqUser = res;
            });
        return Promise.resolve(this.mokreqUser);
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

export interface ApiImageFile {
    name: string;
    file: File;
}