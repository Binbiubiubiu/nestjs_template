import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  creator: number;

  @Column('datetime')
  createAt: Date;

  @Column('int')
  updater: number;

  @Column('datetime')
  updateAt: Date;
}
