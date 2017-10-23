import { TmMahasiswaApi } from './../../../shared/sdk/services/custom/TmMahasiswa';
import { TmDosenApi } from './../../../shared/sdk/services/custom/TmDosen';
import { ChatisiApi } from './../../../shared/sdk/services/custom/Chatisi';
import { ChatroomApi } from './../../../shared/sdk/services/custom/Chatroom';

import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
// import { RealTime } from './../../../shared/sdk/services';
import { RealTime } from './../../../shared/sdk/services/core/real.time';
import { Subscription } from 'rxjs/Subscription';
import { NavController, NavParams, Platform, AlertController, LoadingController, Events, } from 'ionic-angular';


/**
 * Generated class for the ChatDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-chat-details',
  templateUrl: 'chat-details.html',
})
export class ChatDetailsPage {
  limit: number = 10;
  skip: number = 0;
  isEmpty: boolean = false;
  infinite: boolean = false;
  refresher: any;

  data: any;
  public isIos = false;
  @ViewChild('txtChat') txtChat: any;
  @ViewChild('content') content: any;
  private scrollSpeed = 300;
  public arr: any;
  user: any;
  idFrom: any;
  idGet: any;
  nameGet: any;
  header: any;
  idTo: any;
  status: any;
  newMessage: any;
  public subscriptions: Array<Subscription> = [];
  public dataChat: any;
  isMe: any;


  public from: any;
  public to: any;

  public nameFrom: any;
  public nameTo: any;

  public dataTemp;

  public reload: any;


  public dataLogin: any;

  public viewNama: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public chatroomApi: ChatroomApi,
    public chatisiApi: ChatisiApi,
    public storage: Storage,
    private platform: Platform,
    private keyboard: Keyboard,
    private realTime: RealTime,
    public alertController: AlertController,
    public LoadingController: LoadingController,
    public events: Events,
    public tmDosenApi: TmDosenApi,
    public tmMahasiswaApi: TmMahasiswaApi
  ) {

    // data dari memberlist
    this.data = this.navParams.get('data');
    console.log(this.data, 'datadatadatadatadatadatadatadata');

    // datadarichatlist
    this.arr = this.navParams.get('datax');
    console.log(this.arr, 'arrarrarrarrarrarrarrarrarr');

    if (this.platform.is('ios')) {
      this.isIos = true;
    } else {
      this.keyboard.onKeyboardShow()
        .subscribe(() => {
          this.content.scrollToBottom(this.scrollSpeed);
        });
    }

    this.storage.get('stuserid').then((stuserid) => {
      this.storage.get('roleid').then((roleid) => {
        console.log(4444)
        if (roleid == 2) {
          this.tmMahasiswaApi.find({
            where: {
              userid: stuserid
            }
          }).subscribe(req => {
            this.user = req[0]['nama'];
            this.idFrom = req[0]['userid'];
            if (this.data != null || this.data != undefined) {
              this.tmDosenApi.find({
                where: {
                  userid: this.data.userid
                }
              }).subscribe(val => {
                this.idGet = val[0]['userid'];
                this.nameGet = val[0]['nama'];
                this.header = this.idFrom + '_' + val[0]['userid'];
                this.idTo = this.idGet;
                this.status = true;

                this.declareChat();
                this.startEmit();
              })
            } else {
              console.log(13);

              if (this.arr.createdFirst == this.idFrom) {
                this.idTo = this.arr.createdSecond;
              } else if (this.arr.createdFirst != this.idFrom) {
                this.idTo = this.arr.createdFirst;
              }
              this.header = this.arr.headerChat;
              this.nameGet = this.arr.fromname;

              this.declareChat();
              this.startEmit();
            }
          })


          // 
          // this.tmDosenApi.find({
          //   where: {
          //     userid: this.data.userid
          //   }
          // }).subscribe(val => {
          //   console.log(val, 'ini data dosen');
          //   this.tmMahasiswaApi.find({
          //     where: {
          //       userid: stuserid
          //     }
          //   }).subscribe(req => {
          //     this.user = req[0]['nama'];
          //     this.idFrom = req[0]['userid'];

          //     if (this.data != null || this.data != undefined) {
          //       this.idGet = val[0]['userid'];
          //       this.nameGet = val[0]['nama'];
          //       this.header = this.idFrom + '_' + val[0]['userid'];
          //       this.idTo = this.idGet;
          //       this.status = true;

          //       this.declareChat();
          //       this.startEmit();

          //     } else {
          //       console.log('ko masuk sini');

          //       if (this.arr.createdFirst == this.idFrom) {
          //         this.idTo = this.arr.createdSecond;
          //       } else if (this.arr.createdFirst != this.idFrom) {
          //         this.idTo = this.arr.createdFirst;
          //       }
          //       this.header = this.arr.headerChat;
          //       this.nameGet = this.arr.toname;

          //       this.declareChat();
          //       this.startEmit();
          //     }
          //   });

          // });
        } else {

          this.tmDosenApi.find({
            where: {
              userid: stuserid
            }
          }).subscribe(req => {
            this.user = req[0]['nama'];
            this.idFrom = req[0]['userid'];

            if (this.data != null || this.data != undefined) {
              this.tmMahasiswaApi.find({
                where: {
                  userid: this.data.userid
                }
              }).subscribe(val => {
                this.idGet = val[0]['userid'];
                this.nameGet = val[0]['nama'];
                this.header = this.idFrom + '_' + val[0]['userid'];
                this.idTo = this.idGet;
                this.status = true;

                this.declareChat();
                this.startEmit();
              });
            } else {
              if (this.arr.createdFirst == this.idFrom) {
                this.idTo = this.arr.createdSecond;
              } else if (this.arr.createdFirst != this.idFrom) {
                this.idTo = this.arr.createdFirst;
              }
              this.header = this.arr.headerChat;
              this.nameGet = this.arr.fromname;
              
              this.declareChat();
              this.startEmit();
            }


          });

        }
      });

    })
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.content.scrollToBottom(this.scrollSpeed);
    }, 1000);
  }

  ionViewDidLeave(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  send() {
    const newMessage = this.txtChat.content;
    console.log(newMessage, 'Pesan');
    this.chatisiApi.create({
      headerChat: this.header,
      fromid: this.idFrom,
      toid: this.idTo,
      chat: newMessage,
      fromname: this.user,
      toname: this.nameGet
    }).subscribe((result) => {
      console.log(result, 'sueeeeeee');
      this.txtChat.content = '';
      this.newMessage = '';
      console.log('Send Chat Message');
      if (this.status == true) {
        this.chatroomApi.create({
          headerChat: this.header,
          createdFirst: this.idFrom,
          createdSecond: this.idTo,
          fromname: this.user,
          toname: this.nameGet
        }).subscribe((res) => {
          console.log(res, 'Sukses Chat Header')
          this.content.scrollToBottom(this.scrollSpeed);
          this.keyboard.show();
          this.txtChat.clearInput();
          this.txtChat.setFocus();
          this.txtChat.content = '';
          this.events.subscribe('list:update');
          this.status = false;
        })
      }

    })
  }

  public declareChat(): void {
    this.subscriptions.push(
      this.realTime.onReady().subscribe(() => {
        console.log('header', this.header);
        this.realTime.IO.on('CHAT' + this.header)
          .subscribe((result) => {
            //console.log(result,'RESULT APP');

            this.dataChat = JSON.parse(result);

            for (let i = 0; i < this.dataChat.length; i++) {
              if (this.dataChat[i]['fromid'] == this.idFrom) {
                this.isMe = true;
              } else {
                this.isMe = false;
              }
              this.dataChat[i].isMe = this.isMe;
              // console.log(this.dataChat, 'Chat Server');
            }
          }, (error) => {
            console.log(error);
          })
      })
    );
  }

  public startEmit() {
    this.chatisiApi.find({
      where:
      { headerChat: this.header }
    }).subscribe((result) => {
      this.dataChat = result;
      for (let i = 0; i < this.dataChat.length; i++) {
        if (this.dataChat[i]['fromid'] == this.idFrom) {
          this.isMe = true;
        } else {
          this.isMe = false;
        }
        this.dataChat[i].isMe = this.isMe;
      }
      this.content.scrollToBottom(this.scrollSpeed);
    })
  }



  doRefresh(refresher) {
    // If empty disable infinite scroll again
    if (this.isEmpty) {
      return refresher.complete();
    }

    this.infinite = true;
    this.refresher = refresher;

    this.skip += this.limit;
    this.startEmit();
  }

}
