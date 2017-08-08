import { TbUserApi } from './../../shared/sdk/services/custom/TbUser';
import { SignInPage } from './../sign-in/sign-in';
import { ChangepasswordPage } from './changepassword/changepassword';
import { MyProfilePage } from './my-profile/my-profile';
import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public tbUserApi: TbUserApi,
    public events: Events
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  goProfile() {
    this.navCtrl.push(MyProfilePage);
  }

  goChangePassword() {
    this.navCtrl.push(ChangepasswordPage);
  }

  goLogout() {
     this.navCtrl.setRoot(SignInPage);
    // this.storage.get('sessionId').then((sessionId) => {
    //   this.tbUserApi.logout().subscribe(res => {
    this.storage.remove('roleid');
    this.storage.remove('sessionId');
    this.storage.remove('stuserid');
    this.storage.clear();
    window.localStorage.clear();
    this.events.publish('user:logout');
    //   });
    // });
  }

}
