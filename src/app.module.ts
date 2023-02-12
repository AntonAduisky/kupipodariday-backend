import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OffersModule } from './offers/offers.module';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { User } from './users/entities/user.entity';
import { Wish } from './wishes/entities/wish.entity';
import { Wishlist } from './wishlists/entities/wishlist.entity';
import { Offer } from './offers/entities/offer.entity';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().db.host,
      port: config().db.port,
      username: config().db.username,
      password: config().db.password,
      database: config().db.database,
      entities: [User, Wish, Wishlist, Offer],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      load: [config],
    }),
    UsersModule,
    OffersModule,
    WishesModule,
    WishlistsModule,
    AuthModule,
  ],
})
export class AppModule {}
