/* tslint:disable */

declare var Object: any;
export interface TmMahasiswaInterface {
  "nim": string;
  "nama": string;
  "kategori1": number;
  "kategori2": number;
  "kategori3": number;
  "id"?: number;
}

export class TmMahasiswa implements TmMahasiswaInterface {
  "nim": string;
  "nama": string;
  "kategori1": number;
  "kategori2": number;
  "kategori3": number;
  "id": number;
  constructor(data?: TmMahasiswaInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TmMahasiswa`.
   */
  public static getModelName() {
    return "TmMahasiswa";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TmMahasiswa for dynamic purposes.
  **/
  public static factory(data: TmMahasiswaInterface): TmMahasiswa{
    return new TmMahasiswa(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'TmMahasiswa',
      plural: 'TmMahasiswas',
      properties: {
        "nim": {
          name: 'nim',
          type: 'string'
        },
        "nama": {
          name: 'nama',
          type: 'string'
        },
        "kategori1": {
          name: 'kategori1',
          type: 'number'
        },
        "kategori2": {
          name: 'kategori2',
          type: 'number'
        },
        "kategori3": {
          name: 'kategori3',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
