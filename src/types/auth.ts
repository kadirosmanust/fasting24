export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type RegisterResponse = {
  status: boolean;
  user_id: string;
};
