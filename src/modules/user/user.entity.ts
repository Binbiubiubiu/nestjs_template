import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Transform, Expose } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PasswordTransformer } from 'src/common/transformers/password.transformer';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  username: string;

  @Exclude()
  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  password: string;

  @Column({ length: 255, nullable: true })
  firstName: string;

  @Column({ length: 255, nullable: true })
  lastName: string;

  @Expose() // 预先计算的属性
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // @Transform(role => role.name) // 执行其他数据转换
  // role: RoleEntity;
}
