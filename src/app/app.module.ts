import { ChatMemberlistPage } from './../pages/chat/chat-memberlist/chat-memberlist';
import { ChatDetailsPage } from './../pages/chat/chat-details/chat-details';
import { DetailMhsPage } from './../pages/mahasiswa/detail-mhs/detail-mhs';
import { ChangepasswordPage } from './../pages/settings/changepassword/changepassword';
import { MyProfilePage } from './../pages/settings/my-profile/my-profile';
import { FormEventPage } from './../pages/my-calendar/form-event/form-event';
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
import { IonicStorageModule } from '@ionic/storage';
import { ChatBubbleComponent } from './../components/chat-bubble/chat-bubble';
import { ElasticTextareaComponent } from './../components/elastic-textarea/elastic-textarea';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SDKBrowserModule } from '../shared/sdk/index';
import { Moment } from './../components/pipes/moment';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { Keyboard } from '@ionic-native/keyboard';


export function providers() {
  return [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StatusBar,
    SplashScreen,
    Camera,
    Transfer,
    Keyboard,
  ];
}

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
    ElasticTextareaComponent,
    ChatPage,
    SignInPage,
    FormEventPage,
    MyProfilePage,
    ChangepasswordPage,
    DetailMhsPage,
    ChatBubbleComponent,
    ChatDetailsPage,
    ChatMemberlistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SDKBrowserModule.forRoot(),
    IonicStorageModule.forRoot(),
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
    SignInPage,
    FormEventPage,
    MyProfilePage,
    ChangepasswordPage,
    DetailMhsPage,
    ChatDetailsPage,
    ChatMemberlistPage
  ],
  providers: providers()
})
export class AppModule { }
