import { SignInPage } from './../pages/sign-in/sign-in';
import { ChatPage } from './../pages/chat/chat';
import { MyCalendarPage } from './../pages/my-calendar/my-calendar';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { MonthViewComponent } from 'ionic2-calendar/monthview';
import { WeekViewComponent } from 'ionic2-calendar/weekview';
import { DayViewComponent } from 'ionic2-calendar/dayview';
import { SettingsPage } from './../pages/settings/settings';
import { JurnalPage } from './../pages/jurnal/jurnal';
import { MahasiswaPage } from './../pages/mahasiswa/mahasiswa';
import { DosenPage } from './../pages/dosen/dosen';
import { MenuPage } from './../pages/menu/menu';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'angular2-moment';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SDKBrowserModule } from '../shared/sdk/index';
import { Moment } from './../components/pipes/moment';

@NgModule({
  declarations: [
    MyApp,
    Moment,
    HomePage,
    MenuPage,
    DosenPage,
    MahasiswaPage,
    JurnalPage,
    SettingsPage,
    MyCalendarPage,
    CalendarComponent,
    MonthViewComponent,
    WeekViewComponent,
    DayViewComponent,
    ChatPage,
    SignInPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SDKBrowserModule.forRoot(),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    DosenPage,
    MahasiswaPage,
    JurnalPage,
    SettingsPage,
    MyCalendarPage,
    CalendarComponent,
    MonthViewComponent,
    WeekViewComponent,
    DayViewComponent,
    ChatPage,
    SignInPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
