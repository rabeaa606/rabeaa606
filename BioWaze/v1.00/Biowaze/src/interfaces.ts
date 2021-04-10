export interface IUser {
    _id?: string;
    username: string;
    password: string;
    fname: string;
    lname: string;
    location: string;
    job: string;
    sex: string;
    isDoctor: string;
    dateofBirth: Date;
    email: string;
    followers?: Array<{ username: string }>;
    followeing?: Array<{ username: string }>;
    image?: string
}

export interface IFollow {
    username: string;
}

export interface ILogIn {
    username: string;
    password: string;
}

export interface ISignUp {
    username: string;
    password: string;
    confirm_password: string;

}


export interface IPost {
    _id?: string;
    username: string;
    content: string;
    date: Date;
    tags: Array<{ tag: string }>;
    likes: Array<{ username: string }>;
    comments: Array<{ username: string; content: string; }>;
    shares: Array<{ username: string }>;
    userimage?: string

}


export interface IFriend {
    username: string;
    img: string;
}



////apis

export interface ApiPosts {
    username: string;
    content: string;
    date: Date;
    tags: Array<{ tag: string }>;
    likes: Array<{ username: string }>;
    comments: Array<{ username: string; content: string; }>;
    shares: Array<{ username: string }>;
}

export interface IPostResponse {
    post: IPost;
    status: boolean;
    error: string;
}