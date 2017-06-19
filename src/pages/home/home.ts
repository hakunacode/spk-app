import { TbDetailKomptensiDosenApi } from './../../shared/sdk/services/custom/TbDetailKomptensiDosen';
import { TmDosenApi } from './../../shared/sdk/services/custom/TmDosen';
import { TmMahasiswaApi } from './../../shared/sdk/services/custom/TmMahasiswa';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any = [];
  itemspend: any = [];
  itemsfung: any = [];
  constructor(
    public navCtrl: NavController,
    public tmDosenApi: TmDosenApi,
    public tbDetailKomptensiDosenApi: TbDetailKomptensiDosenApi
  ) {

  }

  // generate() {
  //   console.log('okeeyyy');
  //   this.items = [1, 2, 3, 4, 5, 6];

  //   for (let i = 0; i < 200; i++) {
  //     var itemstemp = [1, 2, 3, 4, 5, 6];
  //     var idx_kategori = Math.floor(Math.random() * 6);
  //     var kategori1 = itemstemp[idx_kategori];
  //     itemstemp.splice(idx_kategori, 1);

  //     // console.log(kategori1,'====1======');

  //     idx_kategori = Math.floor(Math.random() * 5);
  //     var kategori2 = itemstemp[idx_kategori];
  //     itemstemp.splice(idx_kategori, 1);

  //     // console.log(kategori2,'=====2=====');

  //     idx_kategori = Math.floor(Math.random() * 4);
  //     var kategori3 = itemstemp[idx_kategori];
  //     itemstemp.splice(idx_kategori, 1);

  //     console.log(kategori1, '====1======', kategori2, '=====2=====', kategori3, '====3======');

  //     this.tmMahasiswaApi.create({
  //       nim: i,
  //       nama: 'MHS' + i,
  //       kategori1: kategori1,
  //       kategori2: kategori2,
  //       kategori3: kategori3
  //     }).subscribe(value => {
  //       console.log(value, 'sukses');
  //     });
  //   }
  // }

  generate2() {
    console.log('okeeyyy');
    this.itemspend = [1, 2];
    this.itemsfung = [1, 2, 3, 4, 5];

    for (let i = 0; i < 12; i++) {
      var arrdetail = [];
      var itemskomp = [1, 2, 3, 4, 5, 6];
      var idx_pend = Math.floor(Math.random() * 2);
      var pend = this.itemspend[idx_pend];

      var idx_fung = Math.floor(Math.random() * 5);
      var fung = this.itemsfung[idx_fung];

      var idx_kategori = Math.floor(Math.random() * 6);
      var kategori = itemskomp[idx_kategori];

      console.log(pend, '====pend======', fung, '=====fung=====', kategori, '====kategori======');



      this.tmDosenApi.create({
        nidn: i,
        nama: 'DSN' + i,
        idPendidikan: pend,
        idKuota: '',
        idKompetensi: kategori,
        idFungsional: fung
      }).subscribe(value => {
        console.log(value, 'sukses');
        // arr detail
        for (let j = 1; j < 7; j++) {
          if (j == idx_kategori) {
            arrdetail[j] = 1;
          } else {
            arrdetail[j] = Math.floor(Math.random() * 5) / 6;
          }
          this.tbDetailKomptensiDosenApi.create({
            idDosen: value['id'],
            idKompetensi: j,
            bobot: arrdetail[j]
          }).subscribe(val => {
            console.log('sikses detail insert');
          });
        }
      });
    }
  }

}
