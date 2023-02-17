import {
  IsNotEmpty,
  Length,
  IsUrl,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { DefaultEntity } from 'src/utils/default.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Wish extends DefaultEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 250, { message: 'Минимум 1 символ, максимум 250 символов' })
  name: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @Column({ default: 1, scale: 2 })
  @IsNotEmpty()
  price: number;

  @Column({ nullable: true, scale: 2 })
  @IsOptional()
  raised: number;

  @JoinColumn()
  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 1024, { message: 'Минимум 1 символ, максимум 1024 символов' })
  description: string;

  @ManyToOne(() => Offer, (offer) => offer.item)
  offers: Array<Offer>;

  @Column({ default: 0, nullable: true })
  @IsInt()
  copied: number;
}
