import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

import { UserEntity } from '../entities/user.entity';
import { UserFormDto } from '../dtos/user-form.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserById(id: number) {
    return this.userRepository.findOne(id);
  }

  async getUserList(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getByUserName(username: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username ')
      .setParameter('username', username)
      .getOne();
  }

  async getByUserNameAndPassWord(username: string, password: string) {
    const passHash = crypto.createHmac('sha256', password).digest('hex');
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username and user.password = :password')
      .setParameter('username', username)
      .setParameter('password', passHash)
      .getOne();
  }

  async create(payload: UserFormDto): Promise<any> {
    const user = await this.getByUserName(payload.username);
    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created',
      );
    }

    return await this.userRepository.save(this.userRepository.create(payload));
  }
}
