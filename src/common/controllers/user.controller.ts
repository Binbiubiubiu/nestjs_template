import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户模块')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseInterceptors(CacheInterceptor) 局部缓存
  @Get('findAll')
  async findAll() {
    return await this.usersService.getUserList();
  }
}
