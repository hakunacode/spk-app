import { TmviewhistorykriteriaApi } from './../../../shared/sdk/services/custom/Tmviewhistorykriteria';
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
  limit_member: number = 10;
  stop_member: boolean = false;
  textSearchMember: any = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public tmDosenApi: TmDosenApi,
    public tmMahasiswaApi: TmMahasiswaApi,
    public viewCtrl: ViewController,
    public tmviewhistorykriteriaApi: TmviewhistorykriteriaApi
  ) {
    this.getListMember('', '');
  }

  getListMember(type, val) {
    this.storage.get('stuserid').then((stuserid) => {
      this.storage.get('roleid').then((roleid) => {
        console.log(roleid, 'roleidroleid');

        if (roleid == 2) {

          if (val !== '') {
            // console.log(124444);

            // this.tmMahasiswaApi.find({
            //   where: { userid: stuserid }
            // }).subscribe(valq => {
            //   if (val.length) {
            //     this.tmviewhistorykriteriaApi.find({
            //       where: {
            //         and: [{ nim: valq[0]['nim'] }, { hasil: 1 },
            //         {
            //           or: [
            //             { namadsn: { like: '%' + val + '%' } },
            //             { nidn: { like: '%' + val + '%' } }
            //           ]
            //         }]
            //       }, order: "namadsn ASC",
            //       limit: this.limit_member,
            //       skip: this.start_member
            //     }).subscribe(value => {
            //       console.log(value, 1111111);

            //       if (value.length !== 0) {
            //         for (let item of value) {
            //           this.items.push({
            //             nama: item['namadsn'],
            //             pictures: item['picturesdsn'],
            //             userid: item['useriddsn']
            //           });
            //         }
            //       } else {
            //         this.stop_member = true;
            //       }

            //       if (type !== '') {
            //         type.complete();
            //       }
            //     }, error => {
            //       console.log('error tidak ada data');
            //     });
            //   }
            // });

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
            // this.tmMahasiswaApi.find({
            //   where: { userid: stuserid }
            // }).subscribe(val => {
            //   if (val.length) {
            //     this.tmviewhistorykriteriaApi.find({
            //       where: {
            //         and:
            //         [{ nim: val[0]['nim'] }, { hasil: 1 }]
            //       }, order: "namadsn ASC",
            //       limit: this.limit_member,
            //       skip: this.start_member
            //     }).subscribe(value => {
            //       if (value.length !== 0) {
            //         for (let item of value) {
            //           this.items.push({
            //             nama: item['namadsn'],
            //             pictures: item['picturesdsn'],
            //             userid: item['useriddsn']
            //           });
            //         }
            //       } else {
            //         this.stop_member = true;
            //       }

            //       if (type !== '') {
            //         type.complete();
            //       }
            //     }, error => {
            //       console.log('error tidak ada data');
            //     });
            //   }
            // });


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
