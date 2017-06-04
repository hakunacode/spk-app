import { Injectable, Pipe } from '@angular/core';
import * as moment from 'moment';

@Injectable()

@Pipe({ name: 'moment' })
export class Moment {
  transform(value) {
    value = value + '';
    return moment(value).fromNow();
  }
}