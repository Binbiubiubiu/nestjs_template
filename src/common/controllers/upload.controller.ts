import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  NotAcceptableException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import {
  FilesInterceptor,
  FileFieldsInterceptor,
  AnyFilesInterceptor,
} from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('文件上传模块')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('/upload')
export class UploadController {
  @ApiOperation({ summary: '上传单个文件' })
  @ApiResponse({ status: 200, description: '上传成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiParam({ name: 'file', description: '上传单个文件', required: true })
  @Post('one')
  @UseInterceptors(FilesInterceptor('file'))
  uploadOneFile(
    @UploadedFiles()
    file,
  ) {
    if (file.length === 0) {
      throw new NotAcceptableException('请求参数错误.');
    }

    return file;
  }

  @ApiOperation({ summary: '上传多个文件' })
  @ApiParam({ name: 'avatar', description: '上传头像', required: true })
  @ApiParam({ name: 'background', description: '上传背景', required: true })
  @ApiResponse({ status: 200, description: '上传成功' })
  @Post('mange')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  async uploadFormFile(@UploadedFiles() files): Promise<any> {
    return files;
  }

  @ApiOperation({ summary: '上传任意文件' })
  @ApiResponse({ status: 200, description: '上传成功' })
  @Post('uploadAny')
  @UseInterceptors(AnyFilesInterceptor())
  uploadAnyFile(@UploadedFiles() files) {
    return files;
  }
}
