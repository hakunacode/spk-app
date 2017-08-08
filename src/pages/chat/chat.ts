import { ChatDetailsPage } from './chat-details/chat-details';
import { ChatMemberlistPage } from './chat-memberlist/chat-memberlist';
import { ChatroomApi } from './../../shared/sdk/services/custom/Chatroom';
import { ChatisiApi } from './../../shared/sdk/services/custom/Chatisi';

import { MyProfilePage } from './../settings/my-profile/my-profile';

import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  public reload: any;
  public user: any;
  public idUser: any;
  public header: any;
  public data: any;
  public idTo: any;
  public listChat: any;
  public listOne: boolean;
  public listTwo: boolean;

  public listData: any;
  public posFrom: boolean;
  public posTo: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public chatisiApi: ChatisiApi,
    public chatroomApi: ChatroomApi,
    public loadingCtrl: LoadingController,
    public events: Events

  ) {
    this.events.publish('list:update', this.declareChat());

    this.loadingShow();
    this.storage.get('stuserid').then((stuserid) => {
      this.idUser = stuserid;

      this.declareChat();
    })
  }


  public declareChat() {
    console.log(this.idUser, 'Id Userssss')
    this.reload = setInterval(() => {
      this.chatroomApi.find({
        where:
        { createdFirst: this.idUser }
        // { createdSecond: this.idUser }
      }).subscribe((result) => {
        if (result.length != 0) {
          // console.log(123)
          this.listChat = result;
          // console.log(this.listChat, 'Header 1')
          if (this.listChat.length > 0) {
            this.listOne = false;
            this.listTwo = true;
          } else {
            this.listOne = true;
            this.listTwo = false;
          }

          var items = [];
          for (let i = 0; i < this.listChat.length; i++) {
            // console.log(this.listChat[i].headerChat, 'header 2')
            this.chatisiApi.find({
              where:
              { headerChat: this.listChat[i].headerChat }
              , limit: 1
              // , skip: 1
            }).subscribe((cuy) => {
              this.listData = cuy;
              items.push(this.listData);
              // console.log(this.listData, 'List Chat 1')
              for (let i = 0; i < this.listData.length; i++) {
                if (this.listData[i].fromid != this.idUser) {
                  this.posFrom = false;
                  this.posTo = true;
                } else if (this.listData[i].fromid == this.idUser) {
                  this.posFrom = true;
                  this.posTo = false;
                }
              }
            })
          }
        } else if (result.length == 0) {
          this.chatroomApi.find({
            where:
            { createdSecond: this.idUser }
          }).subscribe((result) => {
            this.listChat = result;
            if (this.listChat.length > 0) {
              this.listOne = false;
              this.listTwo = true;
            } else {
              this.listOne = true;
              this.listTwo = false;
            }
            for (let i = 0; i < this.listChat.length; i++) {
              this.chatisiApi.find({
                where:
                { headerChat: this.listChat[i].headerChat }
                , limit: 1
                // , skip: 1
              }).subscribe((cuy) => {
                this.listData = cuy;
                // console.log(this.listData, 'list chat  2')
                for (let i = 0; i < this.listData.length; i++) {
                  if (this.listData[i].fromid != this.idUser) {
                    this.posFrom = false;
                    this.posTo = true;
                  } else if (this.listData[i].fromid == this.idUser) {
                    this.posFrom = true;
                    this.posTo = false;
                  }
                }
              })
            }
          });
        }
      })
    }, 2000)
  }

  public search() {
    this.navCtrl.push(ChatMemberlistPage);
  }

  public roomChat(chats) {
    console.log(chats, 'Chats')
    this.navCtrl.push(ChatDetailsPage, { datax: chats });
  }

  loadingShow() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
