import { SignInPage } from './../pages/sign-in/sign-in';
import { MenuPage } from './../pages/menu/menu';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public events: Events
  ) {
    this.initializeApp();
    storage.ready().then(() => {
      this.storage.get('sessionId').then((sessionId) => {
        console.log(sessionId, 'hhh');
        // begin load user
        if (sessionId === null) {
          this.rootPage = SignInPage;
        } else {
          this.rootPage = MenuPage;

        }
      });
    });
    
    // ketikalogout
    this.events.subscribe('user:logout', (val) => {
      storage.ready().then(() => {
        this.storage.get('sessionId').then((sessionId) => {
          console.log(sessionId, 'hhh');
          // begin load user
          if (sessionId === null) {
            this.rootPage = SignInPage;
          } else {
            this.rootPage = MenuPage;

          }
        });
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
