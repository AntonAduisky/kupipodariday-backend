import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';

@Controller('/')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  public async signup(@Body() user: CreateUserDto) {
    const createdUser = await this.usersService.createUser(user);
    return this.authService.login(createdUser);
  }

  @UseGuards(LocalGuard)
  @Post('signin')
  public signin(@Req() req): { access_token: string } {
    return this.authService.login(req.user);
  }
}
