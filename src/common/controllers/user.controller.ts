import {
  Controller,
  Request,
  Post,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/createUserDto';
import { AuthGuard } from '@nestjs/passport';
import { Request as Req } from 'express';
import { AuthService } from '../services/auth.service';
import { UserEntity } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('create')
  async createOne(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }

  // @UseInterceptors(CacheInterceptor) 局部缓存
  @Get('findAll')
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: Req) {
    return this.authService.login(req.user as CreateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req: Req) {
    return req.user;
  }
}
