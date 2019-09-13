import {
  Controller,
  Post,
  Logger,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FilesInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
} from '@nestjs/platform-express';

@Controller()
export class UploadController {
  @Post('uploadOne')
  @UseInterceptors(FilesInterceptor('files'))
  uploadOneFile(@UploadedFiles() files: any) {
    return files;
  }

  @Post('uploadMang')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  async uploadFormFile(@UploadedFiles() files: any): Promise<any> {
    return files;
  }

  @Post('uploadAny')
  @UseInterceptors(AnyFilesInterceptor())
  uploadAnyFile(@UploadedFiles() files) {
    return files;
  }
}
