import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/user.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { JwtStrategy } from './strategys/jwt.strategy';
import { UploadController } from './controllers/upload.controller';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { AuthController } from './controllers/auth.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            ...(configService.get('JWT_EXPIRATION_TIME')
              ? { expiresIn: Number(configService.get('JWT_EXPIRATION_TIME')) }
              : {}),
          },
        } as JwtModuleOptions;
      },
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './upload',
        filename(req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [UploadController, AuthController, UsersController],
  providers: [AuthService, UsersService, JwtStrategy],
  exports: [UsersService, AuthService],
})
export class CommonModule {}
