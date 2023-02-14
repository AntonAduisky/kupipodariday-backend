import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { DefaultEntity } from 'src/utils/default.entity';
import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import {
  MaxLength,
  IsOptional,
  IsUrl,
  IsNotEmpty,
  Length,
} from 'class-validator';

@Entity()
export class Wishlist extends DefaultEntity {
  @Column()
  @IsNotEmpty()
  @Length(1, 250, { message: 'Минимум 1 символ, максимум 250 символов' })
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @MaxLength(1500, { message: 'Максимум 1500 символов' })
  description: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsOptional()
  @IsUrl()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @JoinTable()
  @IsOptional()
  @ManyToMany(() => Wish)
  items: Array<Wish>;
}
