import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { FriendsPageComponent } from './pages/follow-page/friends-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';



const appRoutes: Routes = [
  {
    path: '', component: LoginPageComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'signup-page/:username/:password', component: SignupPageComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'main-page', component: MainPageComponent,
    children: [
      {
        path: 'home-page', component: HomePageComponent,
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'profile-page/:username', component: ProfilePageComponent,

        runGuardsAndResolvers: 'always',
      },
      {
        path: 'friends-page', component: FriendsPageComponent,
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'about-page', component: AboutPageComponent,
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'user-page', component: UserProfilePageComponent,
        runGuardsAndResolvers: 'always',
      },
      {
        path: '', component: HomePageComponent,
        runGuardsAndResolvers: 'always',
      },
    ],

    runGuardsAndResolvers: 'always',

  },
  {
    path: '**', component: LoginPageComponent,
    runGuardsAndResolvers: 'always',

  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
    { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
