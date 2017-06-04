import { TmMahasiswaApi } from './../../shared/sdk/services/custom/TmMahasiswa';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MahasiswaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-mahasiswa',
  templateUrl: 'mahasiswa.html',
})
export class MahasiswaPage {
  items: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tmMahasiswaApi: TmMahasiswaApi
  ) {
    this.getDataMhs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MahasiswaPage');
  }

  getDataMhs() {
    this.tmMahasiswaApi.find().subscribe(value => {
      this.items = value;
      console.log(this.items,1111111111111);
    });
  }

}
