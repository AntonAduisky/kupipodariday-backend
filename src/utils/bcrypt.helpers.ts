import * as bcrypt from 'bcrypt';
import { User } from './../users/entities/user.entity';

export const hash = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const compare = async (password: string, user: User) => {
  return await bcrypt.compare(password, user.password).then((matched) => {
    if (!matched) return null;
    return user;
  });
};
