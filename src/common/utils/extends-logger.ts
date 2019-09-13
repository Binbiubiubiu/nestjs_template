import { Logger } from '@nestjs/common';

export class ExtendsLogger extends Logger {
  log(message: any, context?: string) {
    super.log(message, context);
  }
  error(message: any, trace?: string, context?: string) {
    super.error(message, trace, context);
  }
  warn(message: any, context?: string) {
    super.warn(message, context);
  }
}
