import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/user.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategys/jwt.strategy';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './strategys/constants';
import { UploadController } from './controllers/upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ExtendsLogger } from './utils/extends-logger';
import { diskStorage } from 'multer';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: {
        expiresIn: '60s',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      useNewUrlParser: true,
      host: 'localhost',
      port: 27017,
      database: 'nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './upload',
        filename: function(req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
    // TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    ExtendsLogger,
  ],
  controllers: [UsersController, UploadController],
  exports: [AuthService, UsersService],
})
export class CommonModule {}
