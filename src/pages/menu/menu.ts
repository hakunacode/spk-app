import { TmDosenApi } from './../../shared/sdk/services/custom/TmDosen';
import { TmMahasiswaApi } from './../../shared/sdk/services/custom/TmMahasiswa';
import { ChatPage } from './../chat/chat';
import { MyCalendarPage } from './../my-calendar/my-calendar';
import { SettingsPage } from './../settings/settings';
import { MahasiswaPage } from './../mahasiswa/mahasiswa';
import { DosenPage } from './../dosen/dosen';
import { HomePage } from './../home/home';
// plugin
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, LoadingController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// page


/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any, icons: any, show: boolean }>;
  setPictures: any;
  setNama: any;
  setNim: any;
  setUserid:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public tmMahasiswaApi: TmMahasiswaApi,
    public events: Events,
    public tmDosenApi: TmDosenApi
  ) {
    // ketika login
    this.events.subscribe('user:login', (val) => {
      storage.ready().then(() => {
        this.loadMenu();
        this.storage.get('roleid').then((roleid) => {
          if (roleid == 2) {
            this.loadMhs();
          } else {
            this.loadDSN();
          }
        })
      });
    });
    this.loadMenu();
    storage.ready().then(() => {
      this.storage.get('roleid').then((roleid) => {
        if (roleid == 2) {
          this.loadMhs();
        } else {
          this.loadDSN();
        }
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  loadMenu() {
    console.log(12344321);
    this.storage.get('roleid').then((roleid) => {
      console.log(roleid, 111);
      if (roleid == 1) {
        this.pages = [
          { title: 'Home', component: HomePage, icons: 'home', show: true },
          { title: 'Dosen Pembimbing', component: DosenPage, icons: 'people', show: true },
          { title: 'Mahasiswa', component: MahasiswaPage, icons: 'contacts', show: true },
          { title: 'My Calendar', component: MyCalendarPage, icons: 'calendar', show: true },
          { title: 'Chat', component: ChatPage, icons: 'chatbubbles', show: true },
          { title: 'Pengaturan', component: SettingsPage, icons: 'settings', show: true }
        ];
      } else if (roleid == 2) {
        this.pages = [
          { title: 'Home', component: HomePage, icons: 'home', show: true },
          { title: 'Dosen Pembimbing', component: DosenPage, icons: 'people', show: true },
          { title: 'My Calendar', component: MyCalendarPage, icons: 'calendar', show: true },
          { title: 'Chat', component: ChatPage, icons: 'chatbubbles', show: true },
          { title: 'Pengaturan', component: SettingsPage, icons: 'settings', show: true }
        ];
      } else if (roleid == 3) {
        this.pages = [
          { title: 'Home', component: HomePage, icons: 'home', show: true },
          { title: 'Mahasiswa', component: MahasiswaPage, icons: 'contacts', show: true },
          { title: 'My Calendar', component: MyCalendarPage, icons: 'calendar', show: true },
          { title: 'Chat', component: ChatPage, icons: 'chatbubbles', show: true },
          { title: 'Pengaturan', component: SettingsPage, icons: 'settings', show: true }
        ];
      }
    });
  }
  // gotopage 
  openPage(page) {
    this.nav.setRoot(page.component);
  }

  loadMhs() {
    this.storage.get('stuserid').then((stuserid) => {
      this.tmMahasiswaApi.find({
        where: { userid: stuserid }
      }).subscribe(val => {
        if (val.length != 0) {
          this.setPictures = val[0]['pictures'];
          this.setNama = val[0]['nama'];
          this.setNim = val[0]['nim'];
          this.setUserid = stuserid;
        }
      });
    });
  }

  loadDSN() {
    this.storage.get('stuserid').then((stuserid) => {
      this.tmDosenApi.find({
        where: {
          userid: stuserid
        }
      }).subscribe(val => {
        if (val.length != 0) {
          this.setPictures = val[0]['pictures'];
          this.setNama = val[0]['nama'];
          this.setNim = val[0]['nidn'];
          this.setUserid = stuserid;
        }
      });
    });
  }
}
