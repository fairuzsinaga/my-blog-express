type LoginRequestType = {
  email: string;
  password: string;
};

type CreateUserType = {
  email: string;
  name: string;
  password: string;
  created_at?: Date | undefined;
};

type UserResponse = {
  email: string;
  name: string;
  created_at: Date | undefined | string;
};

export { LoginRequestType, CreateUserType, UserResponse };
