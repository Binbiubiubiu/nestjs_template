import { NestFactory, NestApplication } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
// import { ExpressAdapter } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { HttpExceptionFilterFilter } from './common/utils/http-exception-filter.filter';

import { ExtendsLogger } from './common/utils/extends-logger';

// 自定义日志
async function initExtendsLogger(app) {
  app.useLogger(app.get(ExtendsLogger));
}

// 中间设置
async function initPlugins(app) {
  app.use(helmet()); // 免受一些众所周知的Web漏洞的影响
  // app.use(csurf()); // 跨站点请求伪造（称为CSRF或XSRF）是一种恶意利用网站

  // 限速请求
  app.use(
    new rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  app.use(compression()); // 启用压缩
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  // app.useGlobalFilters(new HttpExceptionFilterFilter()); // 全局异常捕获
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));

  app.enableCors(); // 允许跨域

  initExtendsLogger(app);
  initPlugins(app);

  await app.listen(3000, () => {
    Logger.log(`Server run at port 3000`);
  });
}
bootstrap();
