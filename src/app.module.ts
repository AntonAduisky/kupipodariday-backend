import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './configuration/configuration';

import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { AuthModule } from './auth/auth.module';

import { User } from './users/entities/user.entity';
import { Offer } from './offers/entities/offer.entity';
import { Wish } from './wishes/entities/wish.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration().database.host,
      port: configuration().database.port,
      username: configuration().database.username,
      password: configuration().database.password,
      database: configuration().database.database,
      entities: [User, Wish, Offer, Wishlist],
      synchronize: true,
    }),
    ConfigModule.forRoot({ load: [configuration] }),
    UsersModule,
    OffersModule,
    WishesModule,
    WishlistsModule,
    AuthModule,
  ],
})
export class AppModule {}
