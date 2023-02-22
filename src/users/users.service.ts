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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
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

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    delete user.password;
    return user;
  }

  //auth
  async findUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  async findManyUsers(user): Promise<User[]> {
    const users = await this.userRepository.find({
      where: [{ email: user.query }, { username: user.query }],
    });
    users.forEach((user) => {
      delete user.password;
    });

    return users;
  }

  async updateUserById(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const user = await this.findUserById(id);
      const hashedPassword = await hash(updateUserDto.password);

      const updatedUser = {
        ...user,
        password: hashedPassword,
        email: updateUserDto.email,
        about: updateUserDto.about,
        username: updateUserDto.username,
        avatar: updateUserDto.avatar,
      };
      await this.userRepository.update(user.id, updatedUser);

      return await this.findUserById(id);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
