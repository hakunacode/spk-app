import { DetailMhsPage } from './detail-mhs/detail-mhs';
import { TmDosenApi } from './../../shared/sdk/services/custom/TmDosen';
import { TmviewhistorykriteriaApi } from './../../shared/sdk/services/custom/Tmviewhistorykriteria';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
  setRoleid: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tmDosenApi: TmDosenApi,
    public storage: Storage,
    public tmviewhistorykriteriaApi: TmviewhistorykriteriaApi,
  ) {
    this.getDataMhs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MahasiswaPage');
  }

  getDataMhs() {
    this.storage.get('stuserid').then((stuserid) => {
      this.storage.get('roleid').then((roleid) => {
        this.setRoleid = roleid;
        this.tmDosenApi.find({
          where: { userid: stuserid }
        }).subscribe(val => {
          console.log(val, 666666666);
          if (this.setRoleid == 1) {
            this.tmviewhistorykriteriaApi.find({
              where: {
                and:
                [{ hasil: 1 }]
              }
            }).subscribe(result => {
              this.items = result;
            });
          } else {
            this.tmviewhistorykriteriaApi.find({
              where: {
                and:
                [{ nidn: val[0]['nidn'] }, { hasil: 1 }]
              }
            }).subscribe(result => {
              console.log(result, 888888);

              this.items = result;
            });
          }
        });
      });
    });

  }

  detailMhs(data) {
    this.navCtrl.push(DetailMhsPage, { detailNimMhs: data });
  }

}
