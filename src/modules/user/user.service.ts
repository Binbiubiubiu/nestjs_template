import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import * as crypto from 'crypto';

import { UserEntity } from './user.entity';
import { UserFormDto } from '../auth/dtos/user-form.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository,
  ) {
    super(userRepository);
  }

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
      throw new NotAcceptableException('用户已存在');
    }

    return await this.userRepository.save(this.userRepository.create(payload));
  }
}
