import { IsBoolean, IsNotEmpty, NotEquals } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { DefaultEntity } from 'src/utils/default.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Offer extends DefaultEntity {
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  @IsNotEmpty()
  item: Wish;

  @Column({
    default: 0,
    scale: 2,
    // type: 'real',
  })
  @IsNotEmpty()
  @NotEquals(0)
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;
}
