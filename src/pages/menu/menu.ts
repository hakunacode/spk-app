import { SignInPage } from './../sign-in/sign-in';
import { ChatPage } from './../chat/chat';
import { MyCalendarPage } from './../my-calendar/my-calendar';
import { JurnalPage } from './../jurnal/jurnal';
import { SettingsPage } from './../settings/settings';
import { MahasiswaPage } from './../mahasiswa/mahasiswa';
import { DosenPage } from './../dosen/dosen';
import { HomePage } from './../home/home';
// plugin
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, LoadingController } from 'ionic-angular';

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
  rootPage: any = SignInPage;
  pages: Array<{ title: string, component: any, icons: any, show: boolean }>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) {
    this.loadMenu();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  loadMenu() {
    // let loading = this.loadingCtrl.create({
    //   content: "Loading..."
    // });
    // loading.present();

    // loading.dismiss().then(
    //   value => {
    
    this.pages = [
      { title: 'Home', component: HomePage, icons: 'home', show: true },
      { title: 'Dosen Pembimbing', component: DosenPage, icons: 'people', show: true },
      { title: 'Mahasiswa', component: MahasiswaPage, icons: 'contacts', show: true },
      { title: 'Jurnal', component: JurnalPage, icons: 'book', show: true },
      { title: 'My Calendar', component: MyCalendarPage, icons: 'calendar', show: true },
      { title: 'Chat', component: ChatPage, icons: 'chatbubbles', show: true },
      { title: 'Pengaturan', component: SettingsPage, icons: 'settings', show: true }
    ];
    // });

  }
  // gotopage 
  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
