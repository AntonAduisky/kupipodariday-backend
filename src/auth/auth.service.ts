import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { compare } from 'src/utils/bcrypt.helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public login(user: User): { access_token: string } {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  public async validate(username: string, password: string) {
    const user = await this.usersService.findUserByUsername(username);

    if (!user) {
      throw new NotFoundException('Некорректные данные');
    }

    return compare(password, user);
  }
}
