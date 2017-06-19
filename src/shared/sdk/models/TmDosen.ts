/* tslint:disable */

declare var Object: any;
export interface TmDosenInterface {
  "id"?: number;
  "idFungsional": number;
  "idKompetensi": number;
  "idKuota": number;
  "idPendidikan": number;
  "nama": string;
  "nidn": string;
}

export class TmDosen implements TmDosenInterface {
  "id": number;
  "idFungsional": number;
  "idKompetensi": number;
  "idKuota": number;
  "idPendidikan": number;
  "nama": string;
  "nidn": string;
  constructor(data?: TmDosenInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TmDosen`.
   */
  public static getModelName() {
    return "TmDosen";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TmDosen for dynamic purposes.
  **/
  public static factory(data: TmDosenInterface): TmDosen{
    return new TmDosen(data);
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
      name: 'TmDosen',
      plural: 'TmDosens',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "idFungsional": {
          name: 'idFungsional',
          type: 'number'
        },
        "idKompetensi": {
          name: 'idKompetensi',
          type: 'number'
        },
        "idKuota": {
          name: 'idKuota',
          type: 'number'
        },
        "idPendidikan": {
          name: 'idPendidikan',
          type: 'number'
        },
        "nama": {
          name: 'nama',
          type: 'string'
        },
        "nidn": {
          name: 'nidn',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
