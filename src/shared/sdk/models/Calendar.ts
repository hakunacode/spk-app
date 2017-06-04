/* tslint:disable */

declare var Object: any;
export interface CalendarInterface {
  "subject"?: string;
  "description"?: string;
  "startDate"?: Date;
  "endDate"?: Date;
  "allDay"?: any;
  "id"?: number;
  "nim": string;
}

export class Calendar implements CalendarInterface {
  "subject": string;
  "description": string;
  "startDate": Date;
  "endDate": Date;
  "allDay": any;
  "id": number;
  "nim": string;
  constructor(data?: CalendarInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Calendar`.
   */
  public static getModelName() {
    return "Calendar";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Calendar for dynamic purposes.
  **/
  public static factory(data: CalendarInterface): Calendar{
    return new Calendar(data);
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
      name: 'Calendar',
      plural: 'Calendars',
      properties: {
        "subject": {
          name: 'subject',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "startDate": {
          name: 'startDate',
          type: 'Date'
        },
        "endDate": {
          name: 'endDate',
          type: 'Date'
        },
        "allDay": {
          name: 'allDay',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "nim": {
          name: 'nim',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
