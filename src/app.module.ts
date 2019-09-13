import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // CacheModule.register(),
    CommonModule,
    ApiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      renderPath: '/client',
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,//全局缓存
  //     useClass: CacheInterceptor,
  //   },
  // ],
})
export class AppModule {}
