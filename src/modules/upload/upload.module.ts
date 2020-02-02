import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './upload',
        filename(req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [],
  exports: [],
})
export class UploadModule {}
