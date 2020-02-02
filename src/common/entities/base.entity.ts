import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { DateTimeTransformer } from '../transformers/datetime.transformer';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'create_at',
    comment: '创建时间',
    transformer: new DateTimeTransformer(),
  })
  @Exclude()
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    comment: '更新时间',
    transformer: new DateTimeTransformer(),
  })
  @Exclude()
  updateAt: Date;
}
