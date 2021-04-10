import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ApiUsersService } from 'src/app/services/api/api-users.services';
import { AppCurrentUserService } from 'src/app/services/services/app-current-user.service';
import { IUser } from 'src/interfaces';

@Component({
  selector: 'app-profile-page-list',
  templateUrl: './profile-page-list.component.html',
  styleUrls: ['./profile-page-list.component.scss']
})
export class ProfilePageListComponent implements OnInit {

  form: FormGroup;
  currentUser: IUser;
  imageData: string;
  imageuploaded: boolean = false;
  user_img: any;

  constructor(private _appCurrentUserSvc: AppCurrentUserService, private apiUserSvc: ApiUsersService) { }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null)
    })
    this.currentUser = JSON.parse(localStorage.getItem('current-user'));

    if (this.currentUser.image) {
      this.user_img = this.currentUser.image;
    }
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
