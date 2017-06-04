/* tslint:disable */

declare var Object: any;
export interface MahasiswaInterface {
  "id"?: number;
  "nim": number;
}

export class Mahasiswa implements MahasiswaInterface {
  "id": number;
  "nim": number;
  constructor(data?: MahasiswaInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Mahasiswa`.
   */
  public static getModelName() {
    return "Mahasiswa";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Mahasiswa for dynamic purposes.
  **/
  public static factory(data: MahasiswaInterface): Mahasiswa{
    return new Mahasiswa(data);
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
      name: 'Mahasiswa',
      plural: 'Mahasiswas',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "nim": {
          name: 'nim',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
