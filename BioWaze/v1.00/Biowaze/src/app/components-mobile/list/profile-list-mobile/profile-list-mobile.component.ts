import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUsersService } from 'src/app/services/api/api-users.services';
import { AppCurrentUserService } from 'src/app/services/services/app-current-user.service';
import { IUser } from 'src/interfaces';

@Component({
  selector: 'app-profile-list-mobile',
  templateUrl: './profile-list-mobile.component.html',
  styleUrls: ['./profile-list-mobile.component.scss']
})
export class ProfileListMobileComponent implements OnInit {

  form: FormGroup;
  currentUser: IUser;
  imageData: string;
  imageuploaded: boolean = false;
  user_img: any;


  constructor(private router: Router,
    private _appCurrentUserSvc: AppCurrentUserService,
    private apiUserSvc: ApiUsersService) { }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null)
    })
    this.currentUser = JSON.parse(localStorage.getItem('current-user'));
    if (this.currentUser.image) {
      this.user_img = this.currentUser.image;
    }

  }
  homePage() {
    this.router.navigate(['/main-page/home-page']);
  }

  profilePage() {
    this.router.navigate(['/main-page/profile-page', localStorage.getItem('username')]);
  }

  friendsPage() {
    this.router.navigate(['/main-page/friends-page']);
  }

  abouUsPage() {
    this.router.navigate(['/main-page/about-page']);
  }
  async processFile(event: Event) {

    const file: File = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();

      reader.onload = () => {
        this.currentUser.image = reader.result as string;
        localStorage.setItem("user-img", this.currentUser.image);
        this.user_img = localStorage.getItem("user-img");
        this.imageuploaded = true;
      }
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    const requser = await this.apiUserSvc.setUserImage(this.currentUser);
    localStorage.setItem('current-user', JSON.stringify(requser));
    await this._appCurrentUserSvc.setuser$(requser);

    this.form.reset();
    this.imageData = null;
    this.imageuploaded = false;

  }
}
