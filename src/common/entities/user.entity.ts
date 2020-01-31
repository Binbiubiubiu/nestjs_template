import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Transform, Expose } from 'class-transformer';
import { RoleEntity } from './role.entity';
import { BaseEntity } from '../base/base.entity';
import { PasswordTransformer } from '../utils/password.transformer';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  @Exclude()
  password: string;

  @Column({ length: 255, nullable: true })
  firstName: string;

  @Column({ length: 255, nullable: true })
  lastName: string;

  @Expose() // 预先计算的属性
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Transform(role => role.name) // 执行其他数据转换
  role: RoleEntity;
}
