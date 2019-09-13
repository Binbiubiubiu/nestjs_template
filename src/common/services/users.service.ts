import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, getManager } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from '../strategys/constants';

import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/createUserDto';

@Injectable()
export class UsersService {
  private readonly manager: EntityManager;

  constructor() {
    this.manager = getManager();
  }

  async create(dto: CreateUserDto): Promise<any> {
    return await this.manager.save(
      new UserEntity(
        dto.username,
        bcrypt.hashSync(dto.password, jwtConstants.salt),
      ),
    );
  }
  async findAll(): Promise<UserEntity[] | undefined> {
    return await this.manager.find(UserEntity);
  }

  async findOne(name: string): Promise<UserEntity | undefined> {
    return await this.manager.findOne(UserEntity, { username: name });
  }
}
