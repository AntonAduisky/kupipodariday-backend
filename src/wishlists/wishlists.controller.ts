import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Wishlist } from './entities/wishlist.entity';
import { User } from 'src/users/entities/user.entity';
import { WishInterceptor } from 'src/utils/interceptors/wish.interceptor';
@UseInterceptors(WishInterceptor)
@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  async findAllWishlists(): Promise<Wishlist[]> {
    return this.wishlistsService.findAllWishlists();
  }

  @Post()
  async createWishlist(
    @Req() req,
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    return this.wishlistsService.createWishlist(req.user, createWishlistDto);
  }

  @Get(':id')
  async findWishlistById(@Param('id') id: number): Promise<Wishlist> {
    const wishlist = await this.wishlistsService.findWishlistById(id);
    if (!wishlist) {
      throw new NotFoundException('Не найдено');
    }
    return wishlist;
  }

  @Patch(':id')
  updateWishlistById(
    @Req() { user }: { user: User },
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ): Promise<Wishlist> {
    return this.wishlistsService.updateWishlist(id, updateWishlistDto, user.id);
  }

  @Delete(':id')
  removeWishlistById(
    @Req() { user }: { user: User },
    @Param('id') id: number,
  ): Promise<Wishlist> {
    return this.wishlistsService.removeWishlistById(id, user.id);
  }
}
