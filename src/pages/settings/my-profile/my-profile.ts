import { TmDosenApi } from './../../../shared/sdk/services/custom/TmDosen';
import { ContainerApi } from './../../../shared/sdk/services/custom/Container';
import { TmMahasiswaApi } from './../../../shared/sdk/services/custom/TmMahasiswa';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

/**
 * Generated class for the MyProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  setPictures: any;
  setNim: any;
  setNama: any;
  setTelephone: any;
  picture: any = '';
  namePicture: any = '';
  stuserid: any;
  constructor(
    public camera: Camera,
    public transfer: Transfer,
    public navCtrl: NavController,
    public navParams: NavParams,
    public tmMahasiswaApi: TmMahasiswaApi,
    private toastCtrl: ToastController,
    public storage: Storage,
    private actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public containerApi: ContainerApi,
    public tmDosenApi: TmDosenApi
  ) {

    this.storage.ready().then(() => {
      this.storage.get('stuserid').then((stuserid) => {
        this.storage.get('roleid').then((roleid) => {
          this.stuserid = stuserid;
          if (roleid == 2) {
            this.loadDataMhs(stuserid);
          } else {
            this.loadDataDsn(stuserid);
          }
        });
      });
    });
  }

  loadDataMhs(stuserid) {
    this.tmMahasiswaApi.find({
      where: {
        userid: stuserid
      }
    }).subscribe(item => {
      console.log(item, 11111111);
      if (item.length) {
        this.setPictures = 'http://localhost:3000/api/containers/' + stuserid + '/download/' + item[0]['pictures'];
        this.setNim = item[0]['nim'];
        this.setNama = item[0]['nama'];
        this.setTelephone = item[0]['telphone'];
      }
    });
  }

  loadDataDsn(stuserid) {
    this.tmDosenApi.find({
      where: {
        userid: stuserid
      }
    }).subscribe(val => {
      this.setPictures = 'http://localhost:3000/api/containers/' + stuserid + '/download/' + val[0]['pictures'];
      this.setNim = val[0]['nidn'];
      this.setNama = val[0]['nama'];
      this.setTelephone = val[0]['telphone'];
    });
  }

  doUpdate() {
    console.log(this.setNim, this.setNama, this.setTelephone);
    this.storage.get('stuserid').then((stuserid) => {
      this.storage.get('roleid').then((roleid) => {
        if (roleid == 2) {

          this.tmMahasiswaApi.updateAll({
            userid: stuserid
          }, {
              nim: this.setNim,
              nama: this.setNama,
              telphone: this.setTelephone,
              pictures: this.namePicture
            }).subscribe((val) => {
              console.log(val, 'sukses');
              let toast = this.toastCtrl.create({
                message: 'Updated successfully',
                duration: 1000,
                position: 'bottom'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
                this.navCtrl.pop();
              });

              toast.present();
            }, (error) => {
              console.log(error);
            });

        } else {
          this.tmDosenApi.updateAll({
            userid: stuserid
          }, {
              nidn: this.setNim,
              nama: this.setNama,
              telephone: this.setTelephone,
              pictures: this.namePicture
            }).subscribe((val) => {
              console.log(val, 'sukses');
              let toast = this.toastCtrl.create({
                message: 'Updated successfully',
                duration: 1000,
                position: 'bottom'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
                this.navCtrl.pop();
              });

              toast.present();
            }, (error) => {
              console.log(error);
            });
        }
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Change photo profile',
      buttons: [
        {
          text: 'Take Picture',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.takePicture(true);
          }
        }, {
          text: 'Library',
          handler: () => {
            console.log('Archive clicked');
            this.takePicture(false);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(isCamera): any {

    let loading = this.loadingCtrl.create({
      content: 'loading...'
    });
    loading.present();

    const fileTransfer: TransferObject = this.transfer.create();

    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: isCamera ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 600,
      targetHeight: 600,
      saveToPhotoAlbum: false
    }).then((imageData) => {
      console.log(imageData, 'imageData');
      if (this.picture) {
        this.containerApi.removeFile(this.stuserid, this.picture);
      }

      var options: FileUploadOptions = {
        fileKey: "file",
        fileName: isCamera ? 'IMG_' + this.formatDate() + '_' + this.stuserid + '_' + imageData.substr(imageData.lastIndexOf('/') + 1) : 'IMG_' + this.formatDate() + '_' + this.stuserid + '_' + this.makeid().toString() + '.jpg',
        chunkedMode: false,
        mimeType: "image/jpg"
      };

      console.log(options, 'this is options');

      fileTransfer.upload(imageData, 'http://localhost:3000/api/containers/' + this.stuserid + '/upload', options)
        .then((data) => {

          this.picture = 'http://localhost:3000/api/containers/' + this.stuserid + '/download/' + JSON.parse(data['response']).result.files.file[0].name;

          this.namePicture = JSON.parse(data['response']).result.files.file[0].name;
          loading.dismiss().then(
            value => {
              this.setPictures = 'http://localhost:3000/api/containers/' + this.stuserid + '/download/' + this.namePicture
            }
          );

        }, (err) => {
          console.log(err);
          loading.dismiss().then(
            value => { }
          );
        });

    }, (err) => {
      console.log(err);
      loading.dismiss().then(
        value => { }
      );
    });

  }

  formatDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('');
  }

  makeid() {
    var text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 12; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

}
