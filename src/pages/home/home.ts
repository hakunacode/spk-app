import { TmviewhistorykriteriaApi } from './../../shared/sdk/services/custom/Tmviewhistorykriteria';
import { TmKuotaApi } from './../../shared/sdk/services/custom/TmKuota';
import { TbKriteriaApi } from './../../shared/sdk/services/custom/TbKriteria';
import { TmFungsionalDosenApi } from './../../shared/sdk/services/custom/TmFungsionalDosen';
import { TmPendidikanDosenApi } from './../../shared/sdk/services/custom/TmPendidikanDosen';
import { TbHistoriKlasifikasiApi } from './../../shared/sdk/services/custom/TbHistoriKlasifikasi';
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
  arrPend: any = [];
  arrFunc: any = [];
  arrDeatil: any = [];
  arrKriteria: any = [];
  arrMhs: any;
  idxMhs: any = -1;
  arrDSN: any;
  idxDSN: any = -1;
  max_pend: any = 0;
  max_fung: any = 0;
  max_kat1: any = 0;
  max_kat2: any = 0;
  max_kat3: any = 0;
  max_kuota: any = 0;
  arrkuota: any = [];
  jmlMhs: any;
  jmlDsn: any;
  jmlMhsNew: any;
  constructor(
    public navCtrl: NavController,
    public tmDosenApi: TmDosenApi,
    public tbDetailKomptensiDosenApi: TbDetailKomptensiDosenApi,
    public tmMahasiswaApi: TmMahasiswaApi,
    public tbHistoriKlasifikasiApi: TbHistoriKlasifikasiApi,
    public tmPendidikanDosenApi: TmPendidikanDosenApi,
    public tmFungsionalDosenApi: TmFungsionalDosenApi,
    public tbKriteriaApi: TbKriteriaApi,
    public tmKuotaApi: TmKuotaApi,
    public tmviewhistorykriteriaApi: TmviewhistorykriteriaApi
  ) {
    // mhs
    this.tmMahasiswaApi.find().subscribe(val => {
      this.arrMhs = val;
      this.jmlMhs = val.length;
    });
    this.tmDosenApi.find().subscribe(val => {
      this.jmlDsn = val.length;
    });
  }

  generate(periodeTemp) {
    console.log('okeeyyy');
    if (periodeTemp == undefined) {
      periodeTemp = 2017;
    }
    this.tmMahasiswaApi.find().subscribe(val => {
      this.jmlMhsNew = val.length;
      this.items = [1, 2, 3];

      for (let i = 0; i < 100; i++) {
        var itemstemp = [1, 2, 3];
        var idx_kategori = Math.floor(Math.random() * 3);
        var kategori1 = itemstemp[idx_kategori];
        itemstemp.splice(idx_kategori, 1);

        // console.log(kategori1,'====1======');

        idx_kategori = Math.floor(Math.random() * 2);
        var kategori2 = itemstemp[idx_kategori];
        itemstemp.splice(idx_kategori, 1);

        // console.log(kategori2,'=====2=====');

        idx_kategori = Math.floor(Math.random() * 1);
        var kategori3 = itemstemp[idx_kategori];
        itemstemp.splice(idx_kategori, 1);

        console.log(kategori1, '====1======', kategori2, '=====2=====', kategori3, '====3======');

        this.tmMahasiswaApi.create({
          nim: (this.jmlMhsNew + i),
          nama: 'MHS' + (this.jmlMhsNew + i),
          kategori1: kategori1,
          kategori2: kategori2,
          kategori3: kategori3,
          periode: periodeTemp
        }).subscribe(value => {
          console.log(value, 'sukses');
        });
      }
    });

  }

  generate2() {
    console.log('okeeyyy');
    this.itemspend = [1, 2];
    this.itemsfung = [1, 2, 3, 4, 5];

    for (let i = 0; i < 12; i++) {
      var arrdetail = [];
      var itemskomp = [1, 2, 3];
      var idx_pend = Math.floor(Math.random() * 2);
      var pend = this.itemspend[idx_pend];

      var idx_fung = Math.floor(Math.random() * 5);
      var fung = this.itemsfung[idx_fung];

      var idx_kategori = Math.floor(Math.random() * 3);
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
        for (let j = 1; j < 4; j++) {
          if (j == idx_kategori) {
            arrdetail[j] = 1;
          } else {
            arrdetail[j] = Math.floor(Math.random() * 2) / 3;
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

  generate3() {
    this.tmPendidikanDosenApi.find().subscribe(reqpend => {
      for (let a = 0; a < reqpend.length; a++) {
        this.arrPend[reqpend[a]['id']] = reqpend[a]['bobot'];
      }
      // fung
      this.tmFungsionalDosenApi.find().subscribe(reqfunc => {
        for (let aa = 0; aa < reqfunc.length; aa++) {
          this.arrFunc[reqfunc[aa]['id']] = reqfunc[aa]['bobot'];
        }

        this.tbDetailKomptensiDosenApi.find().subscribe(reqDetail => {
          for (let aaa = 0; aaa < reqDetail.length; aaa++) {
            if (typeof this.arrDeatil[reqDetail[aaa]['idDosen']] === 'undefined') {
              this.arrDeatil[reqDetail[aaa]['idDosen']] = [];
            }
            this.arrDeatil[reqDetail[aaa]['idDosen']][reqDetail[aaa]['idKompetensi']] = reqDetail[aaa]['bobot'];

          }

          this.tbKriteriaApi.find().subscribe(result => {
            for (let aaaa = 0; aaaa < result.length; aaaa++) {
              this.arrKriteria[result[aaaa]['id']] = result[aaaa]['bobot'];
            }
            console.log('beres');
            this.idxMhs = -1;
            this.doGenerateDSN();
            console.log('lewat terkahir');
          });
        });

      });
    });

  }

  doGenerateMhs() {
    this.tmMahasiswaApi.find().subscribe(val => {
      for (let i = 0; i < val.length; i++) {
        // console.log(val);
        var max_pend = 0;
        var max_fung = 0;
        var max_kat1 = 0;
        var max_kat2 = 0;
        var max_kat3 = 0;
        var max_kuota = 0;
        var arrkuota = [];
        console.log("test");
        this.tmDosenApi.find().subscribe(req => {
          console.log(req.length);
          for (let a = 0; a < req.length; a++) {
            if (this.arrPend[req[a]['idPendidikan']] > max_pend) {
              max_pend = this.arrPend[req[a]['idPendidikan']];
            }

            if (this.arrFunc[req[a]['idFungsional']] > max_fung) {
              max_fung = this.arrFunc[req[a]['idFungsional']];
            }

            if (this.arrDeatil[req[a]['id']][val[i]['kategori1']] > max_kat1) {
              max_kat1 = this.arrDeatil[req[a]['id']][val[i]['kategori1']];
            }

            if (this.arrDeatil[req[a]['id']][val[i]['kategori2']] > max_kat2) {
              max_kat2 = this.arrDeatil[req[a]['id']][val[i]['kategori2']];
            }

            if (this.arrDeatil[req[a]['id']][val[i]['kategori3']] > max_kat3) {
              max_kat3 = this.arrDeatil[req[a]['id']][val[i]['kategori3']];
            }

            var valkuotatemp = 0;
            this.tbHistoriKlasifikasiApi.find({
              where: {
                and: [{ idDosen: req[a]['id'], hasil: 1 }]
              }
            }).subscribe(reqHist => {
              console.log(reqHist, ' =');
              this.tmKuotaApi.find({
                where: {
                  and: [{ kuotaMin: { gte: reqHist.length }, kuotaMax: { lt: reqHist.length } }]
                }
              }).subscribe(reqkuotadata => {
                console.log(reqkuotadata, ' ==');
                for (let j = 0; j < reqkuotadata.length; j++) {
                  valkuotatemp = reqkuotadata[j]['bobot'];
                  if (valkuotatemp > max_kuota) {
                    max_kuota = valkuotatemp;
                  }
                }

                arrkuota[req[a]['id']] = valkuotatemp;
                this.tbHistoriKlasifikasiApi.create({
                  idMahasiswa: val[i]['id'],
                  idDosen: req[a]['id'],
                  bobot: 0,
                  hasil: 0,
                }).subscribe(res => {
                  // begin update
                  var pendtemp = this.arrPend[req[a]['idPendidikan']] / max_pend * this.arrKriteria[1];
                  var functemp = this.arrFunc[req[a]['idFungsional']] / max_fung * this.arrKriteria[2];
                  var kat1temp = this.arrDeatil[req[a]['id']][val[i]['kategori1']] / max_fung * this.arrKriteria[3];
                  var kat2temp = this.arrDeatil[req[a]['id']][val[i]['kategori2']] / max_fung * this.arrKriteria[4];
                  var kat3temp = this.arrDeatil[req[a]['id']][val[i]['kategori3']] / max_fung * this.arrKriteria[5];
                  var kuotatemp = parseFloat(arrkuota[req[a]['id']]);
                  //var kuotatemp = (typeof arrkuota[req[a]['id']]!=='undefined'?arrkuota[req[a]['id']]:0);
                  // kuotatemp /= max_kuota * arrKriteria[6];
                  // kuotatemp = isNaN(kuotatemp) ? 0 : kuotatemp;
                  // var jml = pendtemp + functemp + kat1temp + kat2temp + kat3temp + kuotatemp;
                  var jml = pendtemp + functemp + kat1temp + kat2temp + kat3temp;
                  console.log(arrkuota[req[a]['id']], ' jeje ', max_kuota, ' naon ', this.arrKriteria[6]);

                  // console.log(pendtemp, ' ', functemp, ' ', kat1temp, ' ', kat2temp, ' ', kat3temp, ' ', kuotatemp);
                  // console.log(jml,'ini jumlah',val[i]['id'],'=',req[a]['id']);
                  this.tbHistoriKlasifikasiApi.updateAll({
                    idMahasiswa: val[i]['id'],
                    idDosen: req[a]['id']
                  }, {
                      bobot: jml
                    }).subscribe(hasil => {
                      // console.log('hasil update');
                      if (a + 1 >= req.length) {
                        this.UpdateHasil(val[i]['id'], );
                      }
                    });
                });


              })
            });

          }
          // 
        });
      }
      console.log('lewat fungsi ok');
    });
  }

  doLoopMhs() {
    console.log('doLoopMhs', this.idxMhs);
    if (this.idxMhs < this.arrMhs.length - 0) {
      this.idxDSN = -1;
      this.doProsesDSN();
    }
  }

  doProsesDSN() {
    this.idxDSN += 1;
    this.doLoopDSN();
  }

  doLoopDSN() {
    if (this.idxDSN >= this.arrDSN.length) {
      console.log('masuk if');
      this.UpdateHasil(this.arrMhs[this.idxMhs]['id'], );
      // this.doGenerateDSN();

    } else {
      // for (let a = 0; a < this.arrDSN.length; a++) {
      if (this.arrPend[this.arrDSN[this.idxDSN]['idPendidikan']] > this.max_pend) {
        this.max_pend = this.arrPend[this.arrDSN[this.idxDSN]['idPendidikan']];
      }

      if (this.arrFunc[this.arrDSN[this.idxDSN]['idFungsional']] > this.max_fung) {
        this.max_fung = this.arrFunc[this.arrDSN[this.idxDSN]['idFungsional']];
      }

      if (this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori1']] > this.max_kat1) {
        this.max_kat1 = this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori1']];
      }

      if (this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori2']] > this.max_kat2) {
        this.max_kat2 = this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori2']];
      }

      if (this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori3']] > this.max_kat3) {
        this.max_kat3 = this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori3']];
      }

      var valkuotatemp = 0;
      this.tbHistoriKlasifikasiApi.find({
        where: {
          and: [{ idDosen: this.arrDSN[this.idxDSN]['id'], hasil: 1 }]
        }
      }).subscribe(reqHist => {
        console.log(' =', reqHist.length);
        this.tmKuotaApi.find({
          where: {
            and: [{ kuotaMin: { lte: reqHist.length }, kuotaMax: { gt: reqHist.length } }]
          }
        }).subscribe(reqkuotadata => {
          console.log(' ==', reqkuotadata.length);
          this.max_kuota = 0;
          for (let j = 0; j < reqkuotadata.length; j++) {
            valkuotatemp = reqkuotadata[j]['bobot'];
            if (valkuotatemp > this.max_kuota) {
              this.max_kuota = valkuotatemp;
            }
            console.log("valkuotatemp", valkuotatemp);
          }

          this.arrkuota[this.arrDSN[this.idxDSN]['id']] = valkuotatemp;

          console.log('doLoopDSN', this.idxDSN);
          // if (this.idxDSN >= this.arrDSN.length) {
          //   console.log('masuk if');
          //   this.UpdateHasil(this.arrMhs[this.idxMhs]['id'], );
          //   // this.doGenerateDSN();

          // } else {
          this.tbHistoriKlasifikasiApi.create({
            idMahasiswa: this.arrMhs[this.idxMhs]['id'],
            idDosen: this.arrDSN[this.idxDSN]['id'],
            bobot: 0,
            hasil: 0,
          }).subscribe(res => {
            // begin update
            console.log(this.arrPend[this.arrDSN[this.idxDSN]['idPendidikan']], '===', this.max_pend, '===', this.arrKriteria[1]);
            var pendtemp = this.arrPend[this.arrDSN[this.idxDSN]['idPendidikan']] / this.max_pend * this.arrKriteria[1];
            var functemp = this.arrFunc[this.arrDSN[this.idxDSN]['idFungsional']] / this.max_fung * this.arrKriteria[2];
            var kat1temp = this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori1']] / this.max_fung * this.arrKriteria[3];
            var kat2temp = this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori2']] / this.max_fung * this.arrKriteria[4];
            var kat3temp = this.arrDeatil[this.arrDSN[this.idxDSN]['id']][this.arrMhs[this.idxMhs]['kategori3']] / this.max_fung * this.arrKriteria[5];
            var kuotatemp = parseFloat(this.arrkuota[this.arrDSN[this.idxDSN]['id']]);
            //var kuotatemp = (typeof arrkuota[this.arrDSN[this.idxDSN]['id']]!=='undefined'?arrkuota[this.arrDSN[this.idxDSN]['id']]:0);
            if (this.max_kuota == 0) {
              kuotatemp = 0;
            } else {
              kuotatemp /= this.max_kuota * this.arrKriteria[6];
            }
            console.log(this.max_kuota, '+', this.arrKriteria[6], '+', kuotatemp);
            kuotatemp = isNaN(kuotatemp) ? 0 : kuotatemp;
            var jml = pendtemp + functemp + kat1temp + kat2temp + kat3temp + kuotatemp;
            // var jml = pendtemp + functemp + kat1temp + kat2temp + kat3temp;
            console.log(this.arrkuota[this.arrDSN[this.idxDSN]['id']], ' jeje ', this.max_kuota, ' naon ', this.arrKriteria[6]);

            console.log(pendtemp, ' ', functemp, ' ', kat1temp, ' ', kat2temp, ' ', kat3temp, ' ', kuotatemp);
            console.log(jml, 'ini jumlah', this.arrMhs[this.idxMhs]['id'], '=', this.arrDSN[this.idxDSN]['id']);
            this.tbHistoriKlasifikasiApi.updateAll({
              idMahasiswa: this.arrMhs[this.idxMhs]['id'],
              idDosen: this.arrDSN[this.idxDSN]['id']
            }, {
                bobot: jml
              }).subscribe(hasil => {
                // console.log('hasil update');
                // if (this.idxDSN + 1 >= this.arrDSN.length) {
                //   this.UpdateHasil(this.arrMhs[this.idxMhs]['id'], );
                // }
                this.doProsesDSN();
              });
          });

          // this.doProsesDSN();
          // }
        });
      });
    }
    // }

  }

  doGenerateDSN() {
    this.tmDosenApi.find().subscribe(req => {
      this.arrDSN = req;
      this.idxMhs += 1;
      this.idxDSN = 0;
      this.doLoopMhs();
    });
  }

  UpdateHasil(idmhs) {
    // update hasil
    this.tbHistoriKlasifikasiApi.find({
      where: {
        and: [{
          idMahasiswa: idmhs
        }]
      }, limit: 2, order: 'bobot DESC'
    }).subscribe(hasilakhir => {

      for (let b = 0; b < hasilakhir.length; b++) {
        this.tbHistoriKlasifikasiApi.updateAll({
          id: hasilakhir[b]['id']
        }, {
            hasil: 1
          }).subscribe(resultAkhir => {
            if (b + 1 >= hasilakhir.length) {
              console.log(resultAkhir, 'hasil update');
              this.doGenerateDSN();
            }
          });
      }
    });
  }

  // proses bayes
  // proses bayes
  processBayes() {
    console.log(11, 'jj');
    //select dan cari mahasiswa yg belum di proses
    this.tmMahasiswaApi.find(
      { where: { proses: 0 } }
    ).subscribe(dataMhs => {
      console.log(dataMhs, 'jj');
      for (let imhs = 0; imhs < dataMhs.length; imhs++) {
        var idmhsinputan = dataMhs[imhs]['id'];
        this.tmDosenApi.find().subscribe(dataDsn => {
          console.log(dataDsn, 'jjjj');
          for (let idsn = 0; idsn < dataDsn.length; idsn++) {
            this.tmviewhistorykriteriaApi.find(
              {
                where: {
                  and: [{ idMahasiswa: dataMhs[imhs]['id'] }, { idDosen: dataDsn[idsn]['id'] }]
                }
              }
            ).subscribe(dataHisKriteria => {
              console.log(dataHisKriteria, 'jjjj');
              for (let a = 0; a < dataHisKriteria.length; a++) {
                var resAccept = 1;
                var resReject = 1;
                var valAccept = 0;
                var valReject = 0;
                var arrAccept = [];
                var arrReject = [];

                this.tmviewhistorykriteriaApi.find(
                  { where: { and: [{ hasil: 1 }, { proses: 1 }] } }
                ).subscribe(dataHisKriteriaA => {
                  console.log(dataHisKriteriaA, 'ddd');
                  valAccept = dataHisKriteriaA.length;

                  this.tmviewhistorykriteriaApi.find(
                    { where: { and: [{ hasil: 0 }, { proses: 1 }] } }
                  ).subscribe(dataHisKriteriaR => {
                    valReject = dataHisKriteriaR.length;

                    this.tmviewhistorykriteriaApi.find(
                      { where: { and: [{ hasil: 1 }, { idPendidikan: dataHisKriteria[a]['idPendidikan'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                    ).subscribe(dataHisKriteriaAC1 => {
                      arrAccept.push(dataHisKriteriaAC1.length);

                      this.tmviewhistorykriteriaApi.find(
                        { where: { and: [{ hasil: 0 }, { idPendidikan: dataHisKriteria[a]['idPendidikan'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                      ).subscribe(dataHisKriteriaRC1 => {
                        arrReject.push(dataHisKriteriaRC1.length);

                        this.tmviewhistorykriteriaApi.find(
                          { where: { and: [{ hasil: 1 }, { idFungsional: dataHisKriteria[a]['idFungsional'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                        ).subscribe(dataHisKriteriaAC2 => {
                          arrAccept.push(dataHisKriteriaAC2.length);

                          this.tmviewhistorykriteriaApi.find(
                            { where: { and: [{ hasil: 0 }, { idFungsional: dataHisKriteria[a]['idFungsional'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                          ).subscribe(dataHisKriteriaRC2 => {
                            arrReject.push(dataHisKriteriaRC2.length);

                            this.tmviewhistorykriteriaApi.find(
                              { where: { and: [{ hasil: 1 }, { kategori1: dataHisKriteria[a]['kategori1'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                            ).subscribe(dataHisKriteriaAC3 => {
                              arrAccept.push(dataHisKriteriaAC3.length);

                              this.tmviewhistorykriteriaApi.find(
                                { where: { and: [{ hasil: 0 }, { kategori1: dataHisKriteria[a]['kategori1'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                              ).subscribe(dataHisKriteriaRC3 => {
                                arrReject.push(dataHisKriteriaRC3.length);

                                this.tmviewhistorykriteriaApi.find(
                                  { where: { and: [{ hasil: 1 }, { kategori2: dataHisKriteria[a]['kategori2'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                                ).subscribe(dataHisKriteriaAC4 => {
                                  arrAccept.push(dataHisKriteriaAC4.length);

                                  this.tmviewhistorykriteriaApi.find(
                                    { where: { and: [{ hasil: 0 }, { kategori2: dataHisKriteria[a]['kategori2'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                                  ).subscribe(dataHisKriteriaRC4 => {
                                    arrReject.push(dataHisKriteriaRC4.length);

                                    this.tmviewhistorykriteriaApi.find(
                                      { where: { and: [{ hasil: 1 }, { kategori3: dataHisKriteria[a]['kategori3'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                                    ).subscribe(dataHisKriteriaAC5 => {
                                      arrAccept.push(dataHisKriteriaAC5.length);

                                      this.tmviewhistorykriteriaApi.find(
                                        { where: { and: [{ hasil: 0 }, { kategori3: dataHisKriteria[a]['kategori3'] }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                                      ).subscribe(dataHisKriteriaRC5 => {
                                        arrReject.push(dataHisKriteriaRC5.length);

                                        this.tmviewhistorykriteriaApi.find(
                                          { where: { and: [{ hasil: 1 }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                                        ).subscribe(dataHisKriteriaAC6 => {
                                          arrAccept.push(dataHisKriteriaAC6.length);

                                          this.tmviewhistorykriteriaApi.find(
                                            { where: { and: [{ hasil: 0 }, { idDosen: dataDsn[idsn]['id'] }, { proses: 1 }] } }
                                          ).subscribe(dataHisKriteriaRC6 => {
                                            arrReject.push(dataHisKriteriaRC6.length);

                                            for (let b = 0; b < arrAccept.length; b++) {
                                              resAccept *= (arrAccept[b] / valAccept);
                                            }
                                            for (let c = 0; c < arrReject.length; c++) {
                                              resReject *= (arrReject[c] / valAccept);
                                            }

                                            var bobottemp = resAccept / resReject;
                                            console.log(bobottemp, 'lalalalaa');
                                            // update history berdasarkan idmhsinputan yg diupdate bobot=bobot nya
                                            this.tbHistoriKlasifikasiApi.updateAll({
                                              idMahasiswa: dataMhs[imhs]['id'],
                                              idDosen: dataDsn[idsn]['id']
                                            }, {
                                                bobot: bobottemp
                                              }).subscribe(hasil => {
                                                //this.doProsesDSN();
                                                if (imhs == dataMhs.length - 1 && idsn == dataDsn.length - 1) {
                                                  this.UpdateHasil(dataMhs[imhs]['id']);
                                                  console.log("selesai");
                                                } else if (idsn == dataDsn.length - 1) {
                                                  this.UpdateHasil(dataMhs[imhs]['id']);
                                                }
                                              });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              }
            });
          }
        });
        // });
      }
    });
  }
}
