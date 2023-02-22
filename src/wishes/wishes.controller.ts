import {
  Controller,
  // Get,
  Post,
  Body,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { WishInterceptor } from 'src/utils/interceptors/wish.interceptor';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  createWish(@Req() req, @Body() createWishDto: CreateWishDto): Promise<Wish> {
    return this.wishesService.createWish(req.user, createWishDto);
  }

  @UseInterceptors(WishInterceptor)
  @Get('last')
  async findLastWishes(): Promise<Wish[]> {
    const lastWishes = await this.wishesService.findLastWishes();
    return lastWishes;
  }

  @UseInterceptors(WishInterceptor)
  @Get('top')
  async findTopWishes(): Promise<Wish[]> {
    const topWishes = await this.wishesService.findTopWishes();
    return topWishes;
  }

  @UseInterceptors(WishInterceptor)
  @UseGuards(JwtGuard)
  @Get(':id')
  async findWishById(@Param('id') id: number): Promise<Wish> {
    const wish = await this.wishesService.findWishById(id);
    if (!wish) {
      throw new NotFoundException('Подарка не существует');
    }

    return wish;
  }

  @UseInterceptors(WishInterceptor)
  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateWish(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<Wish> {
    const wish = await this.wishesService.findWishById(id);
    if (wish.owner.id === req.user.id) {
      await this.wishesService.updateWish(id, updateWishDto);
      return;
    } else {
      throw new ForbiddenException({ message: 'Не получится' });
    }
  }

  @UseInterceptors(WishInterceptor)
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteWish(@Req() req, @Param('id') id: number): Promise<Wish> {
    const wish = await this.wishesService.findWishById(id);
    if (wish.owner.id === req.user.id) {
      await this.wishesService.removeWish(id);
      return wish;
    } else {
      throw new ForbiddenException({ message: 'Не получится' });
    }
  }

  @UseInterceptors(WishInterceptor)
  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copyWish(@Req() req, @Param('id') id: number) {
    const wish = await this.wishesService.findWishById(id);
    await this.wishesService.updateWish(id, { copied: ++wish.copied });
    const { name, link, image, price, description } = wish;
    if (wish.owner.id !== req.user.id) {
      await this.wishesService.createWish(req.user, {
        name,
        link,
        image,
        price,
        description,
      });
    }
    return {};
  }
}
