import { TbCalendarApi } from './../../../shared/sdk/services/custom/TbCalendar';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events, ViewController, ToastController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
/*
  Generated class for the FormEvent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-form-event',
  templateUrl: 'form-event.html'
})
export class FormEventPage {
  eventData = {};
  allDay: boolean = false;
  subscriptions: Array<Subscription> = [];
  eventDetail;
  isUpdate: boolean = false;
  userData;
  selectedTime: any;
  isDetailLocal: boolean = false;
  idEv: any = '';
  dateSelected: any;
  flag: any = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public calendarApi: TbCalendarApi,
    public events: Events,
    private viewCtrl: ViewController,
    public storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.eventDetail = this.navParams.get('event');
    this.flag = this.navParams.get('flag');
    this.dateSelected = this.navParams.get('date');

    if (this.eventDetail) {
      if (this.eventDetail.id != 0) {
        this.isUpdate = true;
        calendarApi.find({
          where: {
            id: this.eventDetail.id
          }
        }).subscribe((res) => {
          console.log(res, 1111, res[0]['allDay'].data[0]);
          this.eventData['title'] = res[0]['subject'];
          this.eventData['notes'] = res[0]['description'];
          this.eventData['allDay'] = res[0]['allDay'].data[0];
          this.eventData['startDate'] = moment(res[0]['startDate']).format("YYYY-MM-DD");
          this.eventData['endDate'] = moment(res[0]['endDate']).format("YYYY-MM-DD");
          this.eventData['startTime'] = moment(res[0]['startDate']).format("HH:mm");
          this.eventData['endTime'] = moment(res[0]['endDate']).format("HH:mm");
        });
      }
    } else {
      this.eventData = {
        startDate: moment(this.dateSelected).format("YYYY-MM-DD"),
        startTime: moment().format("HH:mm"),
        endDate: moment(this.dateSelected).format("YYYY-MM-DD"),
        endTime: moment().format("HH:mm")
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormEventPage');
  }

  eventToast(val) {
    if (val == 0) {
      let toast = this.toastCtrl.create({
        message: 'Event was updated successfully',
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    } else {
      let toast = this.toastCtrl.create({
        message: 'Event was added successfully',
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    }

  }

  /**
     * Submit event
     */
  submit(): void {
    let startDate;
    let endDate;

    // Check this time is all day or not
    if (this.allDay) {

      endDate = moment(this.eventData['endDate']).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
      startDate = this.eventData['startDate'] + " 00:00:00";

    } else {
      startDate = moment(this.eventData['startDate'] + " " + this.eventData['startTime'], 'YYYY-MM-DD HH:mm');
      endDate = moment(this.eventData['endDate'] + " " + this.eventData['endTime'], 'YYYY-MM-DD HH:mm');

      // Alert if end date is lower than start date
      if (endDate.isBefore(startDate)) {
        let alert = this.alertCtrl.create({
          title: 'Warning',
          subTitle: 'End date must be greater than start date',
          buttons: ['OK']
        });
        alert.present();
        return;
      }

      // startDate = this.eventData['startDate'] + " " + this.eventData['startTime'] + ":00";
      // endDate = this.eventData['endDate'] + " " + this.eventData['endTime'] + ":00";
    }

    this.eventData['startFrom'] = new Date(startDate).toISOString();
    this.eventData['endFrom'] = new Date(endDate).toISOString();

    // If user update normal and not change toggle public
    this.submitServer();
  }

  /**
   * Save data to database
   */
  submitServer(): void {
    if (this.eventDetail) {
      this.idEv = this.eventDetail.id;
    }
    let data = {
      id: this.idEv,
      subject: this.eventData['title'],
      description: this.eventData['notes'],
      startDate: this.eventData['startFrom'],
      endDate: this.eventData['endFrom'],
      allDay: this.eventData['allDay'] ? 1 : 0,
      userid: 1
    }

    // Checing if it's update or create new
    if (this.isUpdate) {
      this.calendarApi.updateEvent(data).subscribe((r) => {
        this.eventToast(0);
        // Referesh event and dismiss modal
        this.events.publish('event:add', 'update');
        this.viewCtrl.dismiss();
      });
    } else {
      this.calendarApi.create(data).subscribe((r) => {
        this.eventToast(1);
        // Referesh event and dismiss modal
        this.events.publish('event:add', 'add');
        this.viewCtrl.dismiss();
      }, (error) => {
        this.viewCtrl.dismiss();
      });
    }
  }

}
