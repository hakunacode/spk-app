/* tslint:disable */

declare var Object: any;
export interface TbUserInterface {
  "username"?: string;
  "password"?: string;
  "status"?: string;
  "createddate"?: Date;
  "realm"?: string;
  "email": string;
  "id"?: number;
  "emailVerified"?: boolean;
  "verificationToken"?: string;
  accessTokens?: any[];
}

export class TbUser implements TbUserInterface {
  "username": string;
  "password": string;
  "status": string;
  "createddate": Date;
  "realm": string;
  "email": string;
  "id": number;
  "emailVerified": boolean;
  "verificationToken": string;
  accessTokens: any[];
  constructor(data?: TbUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TbUser`.
   */
  public static getModelName() {
    return "TbUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TbUser for dynamic purposes.
  **/
  public static factory(data: TbUserInterface): TbUser{
    return new TbUser(data);
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
      name: 'TbUser',
      plural: 'TbUsers',
      properties: {
        "username": {
          name: 'username',
          type: 'string'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "createddate": {
          name: 'createddate',
          type: 'Date'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "verificationToken": {
          name: 'verificationToken',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: ''
        },
      }
    }
  }
}
