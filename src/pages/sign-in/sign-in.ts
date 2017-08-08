import { MenuPage } from './../menu/menu';
import { AuthApi } from './../../shared/sdk/services/custom/Auth';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { LoopBackAuth } from './../../shared/sdk/services/core/auth.service';
/**
 * Generated class for the SignInPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  public myForm: any = null;
  showpass: any = false;
  values: any = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public authApi: AuthApi,
    public auth: LoopBackAuth,
    public storage: Storage,
    public events: Events,
    public alertCtrl: AlertController,
  ) {
    this.myForm = fb.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });

    // Check is already login or not
    storage.ready().then(() => {
      storage.get('sessionId').then((val) => {
        if (val) {
          this.navCtrl.setRoot(MenuPage);
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  onKey(value: string) {
    this.values = value;
  }

  passView(data) {
    if (data == 'showpass') {
      this.showpass = !this.showpass;
    }
  }

  // action login 
  goLogin(val) {
    console.log(val, 111)
    this.authApi.doLogin({
      username: val.username,
      password: val.password
    }).subscribe(value => {
      if (value.length) {
        this.storage.set('roleid', value[0].req[0]['roleId']);
        this.storage.set('sessionId', value[0].result.id);
        this.storage.set('stuserid', value[0].val[0].id);
        this.auth.setToken(value[0].result);
        this.navCtrl.setRoot(MenuPage);
        this.events.publish('event:login');
      } else {
        this.alertCtrl.create({
          message: 'Invalid Username or Password!',
          buttons: [{
            text: 'OK',
            handler: data => {

            }
          }]
        }).present();
      }
    });
  }
}
