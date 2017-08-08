import { ChatDetailsPage } from './../chat-details/chat-details';
import { TmDosenApi } from './../../../shared/sdk/services/custom/TmDosen';
import { TmMahasiswaApi } from './../../../shared/sdk/services/custom/TmMahasiswa';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChatMemberlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-chat-memberlist',
  templateUrl: 'chat-memberlist.html',
})
export class ChatMemberlistPage {
  items: any = [];
  start_member: number = 0;
  limit_member: number = 6;
  stop_member: boolean = false;
  textSearchMember: any = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public tmDosenApi: TmDosenApi,
    public tmMahasiswaApi: TmMahasiswaApi,
    public viewCtrl: ViewController,
  ) {
    this.getListMember('', '');
  }

  getListMember(type, val) {
    this.storage.get('stuserid').then((stuserid) => {
      this.storage.get('roleid').then((roleid) => {
        console.log(roleid, 'roleidroleid');

        if (roleid == 2) {
          
          if (val !== '') {
            this.tmDosenApi.find({
              where: {
                and: [
                  {
                    or: [
                      { nama: { like: '%' + val + '%' } },
                      { nidn: { like: '%' + val + '%' } }
                    ]
                  }]
              }, order: "nama ASC",
              limit: this.limit_member,
              skip: this.start_member
            }).subscribe(value => {
              if (value.length !== 0) {
                for (let item of value) {
                  this.items.push(item);
                }
              } else {
                this.stop_member = true;
              }
              if (type !== '') {
                type.complete();
              }
            }, error => {
              console.log('error tidak ada data');
            });
          } else {
            this.tmDosenApi.find({
              order: "nama ASC",
              limit: this.limit_member,
              skip: this.start_member
            }).subscribe(value => {
              if (value.length !== 0) {
                for (let item of value) {
                  this.items.push(item);
                }
              } else {
                this.stop_member = true;
              }

              if (type !== '') {
                type.complete();
              }
            }, error => {
              console.log('error tidak ada data');
            });
          }
        } else {
          if (val !== '') {
            this.tmMahasiswaApi.find({
              where: {
                and: [
                {
                  or: [
                    { nama: { like: '%' + val + '%' } },
                    { nidn: { like: '%' + val + '%' } }
                  ]
                }]
              }, order: "nama ASC",
              limit: this.limit_member,
              skip: this.start_member
            }).subscribe(value => {
              if (value.length !== 0) {
                for (let item of value) {
                  this.items.push(item);
                }
              } else {
                this.stop_member = true;
              }
              if (type !== '') {
                type.complete();
              }
            }, error => {
              console.log('error tidak ada data');
            });
          } else {
            this.tmMahasiswaApi.find({
              order: "nama ASC",
              limit: this.limit_member,
              skip: this.start_member
            }).subscribe(value => {
              if (value.length !== 0) {
                for (let item of value) {
                  this.items.push(item);
                }
              } else {
                this.stop_member = true;
              }

              if (type !== '') {
                type.complete();
              }
            }, error => {
              console.log('error tidak ada data');
            });
          }
        }
      });

    });
  }

  goStartChat(item) {
    this.navCtrl.push(ChatDetailsPage, { data: item });
    this.dismiss();
  }

  // ifinite 
  doInfinite(infiniteScroll) {
    if (!this.stop_member) {
      this.start_member += this.limit_member;
      this.getListMember(infiniteScroll, this.textSearchMember);
    } else {
      infiniteScroll.complete();
    }
  }

  searchList(val): any {
    this.start_member = 0;
    this.stop_member = false;
    this.items = [];
    if (typeof val.target.value === "undefined") {
      val.target.value = '';
    }
    this.getListMember('', val.target.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatMemberlistPage');
  }

}
