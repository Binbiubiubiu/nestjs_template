import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ApiModule } from './api/api.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from './config/config.module';
import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          timezone: 'UTC',
          charset: 'utf8mb4',
          multipleStatements: true,
          dropSchema: false,
          synchronize: process.env.NODE_ENV === 'development',
          logging: process.env.NODE_ENV === 'development',
        } as TypeOrmModuleOptions;
      },
    }),
    ConfigModule,
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
