import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Exclude, Transform, Expose } from 'class-transformer';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Expose() // 预先计算的属性
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Transform(role => role.name) // 执行其他数据转换
  role: RoleEntity;

  constructor(userName: string, password: string) {
    this.username = userName;
    this.password = password;
  }
}
