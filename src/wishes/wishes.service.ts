import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  async createWish(user: User, createWishDto: CreateWishDto): Promise<Wish> {
    return await this.wishesRepository.save({
      ...createWishDto,
      owner: user,
    });
  }

  async findWishById(id: number): Promise<Wish> {
    const wish = await this.wishesRepository.findOne({
      relations: {
        owner: { wishes: true, wishlists: true, offers: true },
        offers: { user: true },
      },
      where: { id },
    });
    if (!wish) {
      throw new NotFoundException('Не существует');
    }
    delete wish.owner.password;
    return wish;
  }

  async findManyWishesById(id: number[]): Promise<Wish[]> {
    return this.wishesRepository.find({
      where: { id: In(id) },
    });
  }

  findWishesByOwner(ownerId: number): Promise<Wish[]> {
    return this.wishesRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['offers', 'owner'],
    });
  }

  async findTopWishes() {
    return this.wishesRepository.find({ take: 10, order: { copied: 'DESC' } });
  }

  async findLastWishes(): Promise<Wish[]> {
    return this.wishesRepository.find({
      take: 40,
      order: { createdAt: 'DESC' },
    });
  }

  updateWish(id: number, updateWishDto: UpdateWishDto) {
    return this.wishesRepository.update(id, updateWishDto);
  }

  removeWish(id: number) {
    return this.wishesRepository.delete({ id });
  }
}
