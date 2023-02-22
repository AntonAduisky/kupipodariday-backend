import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { WishesService } from 'src/wishes/wishes.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from './entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { UserInterceptor } from 'src/utils/interceptors/user.interceptor';

@UseInterceptors(UserInterceptor)
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Get('me')
  async getMyProfile(@Req() req): Promise<User> {
    return this.usersService.findUserById(req.user.id);
  }

  //auth
  @Get(':username')
  async findUserByUsername(@Param('username') username: string): Promise<User> {
    return await this.usersService.findUserByUsername(username);
  }

  @Get('me/wishes')
  async findMyWishes(@Req() req): Promise<Wish[]> {
    return this.wishesService.findWishesByOwner(req.user.id);
  }

  @Get(':username/wishes')
  async findWishesByUsername(
    @Param('username') username: string,
  ): Promise<Wish[]> {
    const user = await this.usersService.findUserByUsername(username);
    return this.wishesService.findWishesByOwner(user.id);
  }

  @Post('find')
  async findManyUsers(@Body() user): Promise<User[]> {
    return this.usersService.findManyUsers(user);
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  async updateMyProfile(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUserById(req.user.id, updateUserDto);
  }
}
