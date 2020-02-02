import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserFormDto } from './dtos/user-form.dto';

@ApiTags('授权模块')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('/')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @ApiOperation({ summary: '用户登录' })
  @ApiResponse({ status: 200, description: '登录成功' })
  @ApiResponse({ status: 400, description: '请求格式错误' })
  @ApiResponse({ status: 401, description: '登录失败' })
  @Post('login')
  async login(
    @Body()
    payload: UserFormDto,
  ) {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  @ApiOperation({ summary: '用户注册' })
  @ApiResponse({ status: 200, description: '登录成功' })
  @ApiResponse({ status: 400, description: '请求格式错误' })
  @ApiResponse({ status: 401, description: '登录失败' })
  @Post('register')
  async register(@Body() payload: UserFormDto) {
    const user = await this.usersService.create(payload);
    return await this.authService.createToken(user);
  }

  @ApiOperation({ summary: '获取用户个人信息' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: '登录成功' })
  @ApiResponse({ status: 401, description: '未授权' })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getLoggedInUser(@Request() req) {
    return req.user;
  }
}
