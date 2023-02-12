import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isTrue: boolean;
}
