import { User } from './user';

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type RegisterResponse = {
  user: User;
  token: string;
};
