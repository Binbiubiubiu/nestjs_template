import { CustomScalar } from '@nestjs/graphql';
import { Kind } from 'graphql';
import * as moment from 'moment';

export class DateScalar implements CustomScalar<string, Date> {
  description: string = '日期时间 自定义类型';
  parseValue(value: string): Date {
    return moment(value).toDate(); // value from the client
  }
  serialize(value: Date): string {
    return moment(value).format('YYYY-MM-DD HH:mm:ss'); // value sent to the client
  }
  parseLiteral(ast: any): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
