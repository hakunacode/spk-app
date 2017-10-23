import { MyProfilePage } from './../my-profile/my-profile';
import { AuthApi } from './../../../shared/sdk/services/custom/Auth';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  passwordcurrent: any;
  passwordnew: any;
  passwordconfirm: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authApi: AuthApi
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }

  submit() {
    if (this.passwordcurrent == this.passwordnew) {
      this.alertCtrl.create({
        message: 'Old password and new cannot be same',
        buttons: [{
          text: 'OK',
          handler: data => {
            // this.viewCtrl.dismiss();
          }
        }]
      }).present();
      return;
    }
    let loading = this.loadingCtrl.create({
      content: 'please wait...'
    });
    loading.present();
    // start 
    this.storage.ready().then(() => {
      this.storage.get('stuserid').then((stuserid) => {
        // begin
        this.authApi.changePass({
          userid: stuserid,
          oldPassword: this.passwordcurrent,
          newPassword: this.passwordnew
        }).subscribe(value => {
          loading.dismiss().then(value => {
            this.alertCtrl.create({
              message: 'Password has been successfully changed.',
              buttons: [{
                text: 'OK',
                handler: data => {
                  this.navCtrl.setRoot(MyProfilePage)
                }
              }]
            }).present();
          });
        });
      });
    });
  }

}
