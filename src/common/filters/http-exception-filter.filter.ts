import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import moment = require('moment');

@Catch(HttpException)
export class HttpExceptionFilterFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      ...exception,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
    });
  }
}
