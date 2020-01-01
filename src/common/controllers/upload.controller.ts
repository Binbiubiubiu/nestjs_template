import {
  Controller,
  Post,
  Logger,
  UploadedFiles,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  FilesInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
} from '@nestjs/platform-express';

@Controller('/upload')
export class UploadController {
  @Post('one')
  @UseInterceptors(FilesInterceptor('file'))
  uploadOneFile(@UploadedFiles() file) {
    if (file.length === 0) {
      throw new HttpException('请求参数错误.', HttpStatus.FORBIDDEN);
    }

    return file;
  }

  @Post('mange')
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
