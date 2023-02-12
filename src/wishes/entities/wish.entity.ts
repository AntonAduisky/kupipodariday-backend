import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isTrue: boolean;
}
