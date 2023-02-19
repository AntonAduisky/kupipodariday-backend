import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
  ) {}

  async createWishlist(
    user: User,
    createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    const { itemsId, ...rest } = createWishlistDto;
    const wishes = itemsId.map((id: number) => ({ id } as Wish));
    const wishlist = this.wishlistsRepository.create({
      ...rest,
      owner: user,
      items: wishes,
    });
    return this.wishlistsRepository.save(wishlist);
  }

  async findAllWishlists(): Promise<Wishlist[]> {
    return this.wishlistsRepository.find({
      relations: ['items', 'owner'],
    });
  }

  async findWishlistById(id: number): Promise<Wishlist> {
    return this.wishlistsRepository.findOne({
      where: { id },
      relations: ['items', 'owner'],
    });
  }

  async updateWishlistById(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    userId: number,
  ) {
    const wishlist = await this.findWishlistById(id);
    if (wishlist.owner.id !== userId) {
      throw new BadRequestException();
    }
    return this.wishlistsRepository.update(id, updateWishlistDto);
  }

  async removeWishlistById(id: number, userId: number) {
    const wishlist = await this.findWishlistById(id);
    if (wishlist.owner.id !== userId) {
      throw new BadRequestException();
    }

    await this.wishlistsRepository.delete(id);
    return wishlist;
  }
}
