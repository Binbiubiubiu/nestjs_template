import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { Collection } from 'mongoose';

@Entity()
export class RoleEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;
}
