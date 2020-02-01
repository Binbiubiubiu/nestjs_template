import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entities/user.entity';
import { ConfigService } from '../../config/config.service';
import { UserFormDto } from '../dtos/user-form.dto';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async createToken(user: UserEntity) {
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({ id: user.id }),
      user: classToPlain(user),
    };
  }

  async validateUser({ username, password }: UserFormDto) {
    const user = await this.usersService.getByUserNameAndPassWord(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException('登录失败!');
    }
    return user;
  }
}
