import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isTrue: boolean;
}
