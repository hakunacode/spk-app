import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from 'ionic-native';
import { EventInterface } from './event/event';
// import * as moment from 'moment';
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
    public platform: Platform
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
}
