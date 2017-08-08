import { TmMahasiswaApi } from './../../../shared/sdk/services/custom/TmMahasiswa';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailMhsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-detail-mhs',
  templateUrl: 'detail-mhs.html',
})
export class DetailMhsPage {
  detailNimMhs: any;
  items: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tmMahasiswaApi: TmMahasiswaApi
  ) {
    this.detailNimMhs = this.navParams.get('detailNimMhs');

    this.loadMhs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailMhsPage');
  }

  loadMhs() {
    this.tmMahasiswaApi.find({
      where: { nim: this.detailNimMhs }
    }).subscribe(req => {
      this.items = req;
    });
  }
}
