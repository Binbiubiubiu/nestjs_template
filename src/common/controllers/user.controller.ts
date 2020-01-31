import {
  Controller,
  Request,
  Post,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request as Req } from 'express';
import { AuthService } from '../services/auth.service';
import { UserFormDto } from '../dtos/user-form.dto';
@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // @UseInterceptors(CacheInterceptor) 局部缓存
  @Get('findAll')
  async findAll() {
    return await this.usersService.getUserList();
  }

  @Post('login')
  async login(@Body() payload: UserFormDto) {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  @Post('register')
  async register(@Body() payload: UserFormDto) {
    const user = await this.usersService.create(payload);
    return await this.authService.createToken(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getLoggedInUser(@Request() req: Req) {
    return req.user;
  }
}
