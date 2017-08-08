import { TmMahasiswaApi } from './../../shared/sdk/services/custom/TmMahasiswa';
import { TmviewhistorykriteriaApi } from './../../shared/sdk/services/custom/Tmviewhistorykriteria';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DosenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-dosen',
  templateUrl: 'dosen.html',
})
export class DosenPage {
  items: any;
  setRoleid: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tmviewhistorykriteriaApi: TmviewhistorykriteriaApi,
    public tmMahasiswaApi: TmMahasiswaApi,
    public storage: Storage,
  ) {
    this.loadDosen();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DosenPage');
  }

  loadDosen() {
    this.storage.get('stuserid').then((stuserid) => {
      this.storage.get('roleid').then((roleid) => {
        this.setRoleid = roleid;
        this.tmMahasiswaApi.find({
          where: { userid: stuserid }
        }).subscribe(val => {
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
                [{ nim: val[0]['nim'] }, { hasil: 1 }]
              }
            }).subscribe(result => {
              this.items = result;
            });
          }
        });
      });
    });
  }
}
