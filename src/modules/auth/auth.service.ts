import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { UserFormDto } from './dtos/user-form.dto';
import { classToPlain } from 'class-transformer';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UserService,
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
