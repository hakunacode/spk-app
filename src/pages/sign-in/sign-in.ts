import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
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
  ) {
    this.myForm = fb.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])],
      'isflag': ['', Validators.compose([Validators.required])]
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
  goLogin(val){
    console.log(val);
  }
}
