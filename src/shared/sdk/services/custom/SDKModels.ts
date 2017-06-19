/* tslint:disable */
import { Injectable } from '@angular/core';
import { Auth } from '../../models/Auth';
import { Rolemapping } from '../../models/Rolemapping';
import { Container } from '../../models/Container';
import { TmPegawai } from '../../models/TmPegawai';
import { TbUser } from '../../models/TbUser';
import { TbCalendar } from '../../models/TbCalendar';
import { TbChatroom } from '../../models/TbChatroom';
import { TbChatuserto } from '../../models/TbChatuserto';
import { TbChatuser } from '../../models/TbChatuser';
import { TbChatroomlist } from '../../models/TbChatroomlist';
import { TbChatroomdetail } from '../../models/TbChatroomdetail';
import { TmMahasiswa } from '../../models/TmMahasiswa';
import { TmDosen } from '../../models/TmDosen';
import { TbDetailKomptensiDosen } from '../../models/TbDetailKomptensiDosen';
import { TbHistoriKlasifikasi } from '../../models/TbHistoriKlasifikasi';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Auth: Auth,
    Rolemapping: Rolemapping,
    Container: Container,
    TmPegawai: TmPegawai,
    TbUser: TbUser,
    TbCalendar: TbCalendar,
    TbChatroom: TbChatroom,
    TbChatuserto: TbChatuserto,
    TbChatuser: TbChatuser,
    TbChatroomlist: TbChatroomlist,
    TbChatroomdetail: TbChatroomdetail,
    TmMahasiswa: TmMahasiswa,
    TmDosen: TmDosen,
    TbDetailKomptensiDosen: TbDetailKomptensiDosen,
    TbHistoriKlasifikasi: TbHistoriKlasifikasi,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
