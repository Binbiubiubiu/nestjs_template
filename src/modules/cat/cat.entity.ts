import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('cat')
export class CatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  species: string;
}
