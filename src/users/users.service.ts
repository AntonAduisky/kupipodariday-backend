import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hash } from '../utils/bcrypt.helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await hash(createUserDto.password);
      const createdUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      return await this.userRepository.save(createdUser);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  findUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async findManyUsers(user) {
    return await this.userRepository.find({
      where: [{ email: user.query }, { username: user.query }],
    });
  }

  async updateUserById(id: number, user: UpdateUserDto) {
    if (user.password) {
      const hashedPassword = await hash(user.password);
      return this.userRepository.update(id, {
        ...user,
        password: hashedPassword,
      });
    }
    return this.userRepository.update(id, user);
  }
}
