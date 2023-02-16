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
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAllWishlists() {
    return this.wishlistsService.findAllWishlists();
  }

  @UseGuards(JwtGuard)
  @Post()
  async createWishlist(
    @Req() req,
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    return this.wishlistsService.createWishlist(req.user, createWishlistDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findWishlistById(@Param('id') id: number) {
    const wishlist = await this.wishlistsService.findWishlistById(id);
    if (!wishlist) {
      throw new NotFoundException('Не найдено');
    }
    return wishlist;
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateWishlistById(
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.updateWishlistById(id, updateWishlistDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  removeWishlistById(@Param('id') id: number) {
    return this.wishlistsService.removeWishlistById(id);
  }
}
