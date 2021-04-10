import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';

import { MainHeaderComponent } from './components/headers/main-header/main-header.component';
import { LoginHeaderComponent } from './components/headers/login-header/login-header.component';
import { FormLoginComponent } from './components/forms/form-login/form-login.component';
import { FormSignupComponent } from './components/forms/form-signup/form-signup.component';
import { PostComponent } from './components/posts/post/post.component';
import { MakePostComponent } from './components/posts/make-post/make-post.component';
import { ListPostComponent } from './components/posts/list-post/list-post.component';
import { PanelPostsComponent } from './components/posts/panel-posts/panel-posts.component';
import { UsersListComponent } from './components/list/users-list/users-list.component';
import { ProfilePageListComponent } from './components/list/profile-page-list/profile-page-list.component';
import { DefaultListComponent } from './components/list/default-list/default-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { FriendsPageComponent } from './pages/follow-page/friends-page.component';
import { FriendsListComponent } from './components/follow/follow-list/friends-list.component';
import { FriendCardComponent } from './components/follow/follow-card/friend-card.component';
import { PostLikesComponent } from './components/posts/post-likes/post-likes.component';
import { PostCommentsComponent } from './components/posts/post-comments/post-comments.component';
import { UserCardComponent } from './components/cards/user-card/user-card.component';
import { ProfileCardComponent } from './components/cards/profile-card/profile-card.component';
import { ProfileListMobileComponent } from './components-mobile/list/profile-list-mobile/profile-list-mobile.component';




@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    HttpClientModule,
    CoreModule,

  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    SignupPageComponent,
    ProfilePageComponent,
    HomePageComponent,
    PostComponent,
    MainHeaderComponent,
    LoginHeaderComponent,
    FormLoginComponent,
    FormSignupComponent,
    MakePostComponent,
    ListPostComponent,
    PanelPostsComponent,
    UsersListComponent,
    ProfilePageListComponent,
    DefaultListComponent,
    AboutPageComponent,
    FriendsPageComponent,
    FriendsListComponent,
    FriendCardComponent,
    UserProfilePageComponent,
    ProfileCardComponent,
    PostLikesComponent,
    PostCommentsComponent,
    UserCardComponent,
    ProfileListMobileComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



