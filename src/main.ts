import { SocketIoAdapter } from './modules/websocket/socketio.adapter';
import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import { setupSwagger } from './swagger';
import { AppModule } from './app.module';

// 中间设置
async function initPlugins(app) {
  app.setGlobalPrefix('');

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
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: false,
  });

  app.useWebSocketAdapter(new SocketIoAdapter(app));

  setupSwagger(app); // 初始化swagger文档

  app.enableCors(); // 允许跨域

  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilterFilter()); // 全局异常捕获
  // app.useGlobalInterceptors(new ReturnBodyInterceptor()); // 自动包裹返回体

  initPlugins(app);

  await app.listen(3000, () => {
    Logger.log(`Server run at port 3000`);
  });
}
bootstrap();
