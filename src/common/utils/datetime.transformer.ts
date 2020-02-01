import { ValueTransformer } from 'typeorm';
import * as moment from 'moment';

export class DateTimeTransformer implements ValueTransformer {
  constructor(private readonly dateTimeReg: string = 'YYYY-MM-DD HH:mm:ss') {}

  to(value: string) {
    return value;
  }
  from(value: string) {
    return moment(value).format(this.dateTimeReg);
  }
}
