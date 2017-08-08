import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, ActionSheetController, ToastController } from 'ionic-angular';
import { Calendar } from 'ionic-native';
import { EventInterface } from './event/event';
// import * as moment from 'moment';
import { TbCalendarApi } from './../../shared/sdk/services/custom/TbCalendar';
import { FormEventPage } from './form-event/form-event';
import * as moment from 'moment';
/**
 * Generated class for the MyCalendarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-calendar',
  templateUrl: 'my-calendar.html',
})
export class MyCalendarPage {
  startDate;
  endDate;
  calendarTitle: string;
  eventSource: EventInterface[];
  isToday: boolean;
  isPopover: boolean = false;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  }
  selectedTime: any;
  data: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private loadingCtrl: LoadingController,
    private tbCalendarApi: TbCalendarApi,
    private toastCtrl: ToastController,
    private actionsheetCtrl: ActionSheetController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCalendarPage');
  }

  onViewTitleChanged(title) {
    setTimeout(() => {
      this.calendarTitle = title;
    }, 1000);
  }
  /**
   * Get today function
   */
  today() {
    this.calendar.currentDate = new Date();
    this.getEventPublic();
  }
  /**
   * Change calendar mode
   *
   * @param string mode
   */
  changeMode(mode) {
    this.calendar.mode = mode;
    this.getEventPublic();
  }
  /**
   * Set on time selected
   */
  onTimeSelected(event): void {
    this.selectedTime = event.selectedTime;
  }

  getEventPublic(): void {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.tbCalendarApi.find({
      where: {
        userid: 1,
        startDate: { gte: this.startDate },
        endDate: { lte: this.endDate }
      }
    }).subscribe(results => {
      console.log(results, 'jj');
      loader.dismiss().then(
        value => {
          for (let result of results) {

            let startDate = moment(result['startDate']);
            let endDate = moment(result['endDate']);
            if (result['allDay'].data[0]) {
              startDate = moment.utc(moment(result['startDate']).format("YYYY-MM-DD HH:mm"));
              endDate = moment.utc(moment(result['endDate']).format("YYYY-MM-DD HH:mm"));
            }

            this.data.push({
              id: result['id'],
              title: result['subject'],
              notes: result['description'],
              startTime: startDate.toDate(),
              endTime: endDate.toDate(),
              allDay: (result['allDay'].data[0] == 1) ? true : false,
              server: true
            });
          }

          // Show event
          this.eventSource = this.data;
        });
    }, (error) => {
      console.log(error);
      loader.dismiss();
    });
  }

  /**
   * Calendar permission checking
   */
  calendarCheckPermission(): void {
    // If shared calendar
    // if (this.navParam.get('dataShare')) {
    //   this.userData = this.navParam.get('dataShare');
    //   this.isPopover = true;
    //   // this.checkUserData();
    //   this.getEventPublic();
    //   return;
    // }

    Calendar.hasReadWritePermission()
      .then((result) => {
        if (result) {
          if (this.platform.is('android')) {
            this.listEvents();
          } else if (this.platform.is('ios')) {
            this.listEventsIos();
          }
        } else {
          this.requestReadWrite();
        }
      }, (error) => console.log(error));
  }
  /**
   * Calendar request permission
   */
  requestReadWrite(): void {
    Calendar.requestReadWritePermission()
      .then((result) => {
        if (this.platform.is('android')) {
          this.listEvents();
        } else if (this.platform.is('ios')) {
          this.listEventsIos();
        }
      }, (error) => console.log(error));
  }
  /**
  * Get events from local calendar
  */
  listEvents(): void {
    // Get data
    this.data = [];
    Calendar.findEvent('', '', '', this.startDate, this.endDate)
      .then((results) => {
        for (let result of results) {
          this.data.push({
            title: result.title,
            notes: result.message ? result.message : '',
            startTime: new Date(result.startDate),
            endTime: new Date(result.endDate),
            allDay: result.allday,
            server: false
          });
        }

        // check public event
        // this.checkUserData();
        this.getEventPublic();
      }, (error) => {
        console.log(error);
        this.eventSource = this.data;
      });
  }

  /**
   * Get events from local calendar for ios only
   */
  listEventsIos(): void {
    // Get data
    this.data = [];
    Calendar.findEvent('', '', '', this.startDate, this.endDate)
      .then((results) => {
        for (let result of results) {
          let allDays = false;
          // let startDate = moment(result.startDate).toDate();

          if (result.startDate.split(" ")[1] == "00:00:00" && result.endDate.split(" ")[1] == "23:59:59") {
            allDays = true;
          }

          this.data.push({
            title: result.title,
            notes: result.message ? result.message : '',
            // startTime: startDate,
            // endTime: moment(result.endDate).toDate(),
            allDay: allDays
          });
        }

        // Check public event
        // this.checkUserData();
        this.getEventPublic();
      }, (error) => {
        this.eventSource = this.data;
        console.log(error);
      });
  }

  onRangeChanged(event): void {
    console.log(event, 'eventevent');

    this.startDate = event.startTime;
    this.endDate = event.endTime;

    // Check if is android, so load event from local calendar
    this.data = [];
    // this.checkUserData();
    this.getEventPublic();
    this.calendarCheckPermission();
  }

  eventPopover(popEvent): void {
    this.navCtrl.push(FormEventPage, { date: this.selectedTime, flag: 0 });
  }

  onEventSelected(event): void {
    // Check if on shared calendar, so disable action sheet
    if (this.navParams.get('dataShare')) {
      return;
    }

    let actionButtons = [
      {
        text: 'Detail',
        role: 'destructive',
        icon: !this.platform.is('ios') ? 'information-circle' : null,
        handler: () => {
          this.detailEvent(event);
        }
      },
      {},
      {
        text: 'Cancel',
        role: 'cancel', // will always sort to be on the bottom
        icon: !this.platform.is('ios') ? 'close' : null,
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ];


    /** Check if calendar from local or server,
     *  if from server, method delete is visible
     */
    if (event.server) {
      actionButtons[1] = {
        text: 'Delete',
        icon: !this.platform.is('ios') ? 'trash' : null,
        handler: () => {
          this.deleteEvent(event);
        }
      };
    } else {
      actionButtons.splice(1, 1);
    }

    let actionSheet = this.actionsheetCtrl.create({
      title: 'Action',
      buttons: actionButtons
    });
    actionSheet.present();
  };

  detailEvent(event): void {
    this.navCtrl.push(FormEventPage, {
      event: event, flag: 1
    });
  }

  deleteEvent(event): void {

    this.tbCalendarApi.deleteEvent({ id: event.id })
      .subscribe((result) => {
        let toast = this.toastCtrl.create({
          message: 'Event was deleted successfully',
          duration: 3000,
          position: 'bottom'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
        this.data = [];
        this.getEventPublic();
        this.calendarCheckPermission();
      }, error => console.log(error));
  }

}
