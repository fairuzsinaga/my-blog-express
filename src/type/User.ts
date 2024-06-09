

type LoginRequestType = {
  email: String,
  password: String
}

type CreateUserType = {
  email: String,
  name: String,
  password: String,
  created_at?: Date | undefined
}

type UserResponse = {
  email: String,
  name: String,
  created_at: Date | undefined | String
}

export {
  LoginRequestType,
  CreateUserType,
  UserResponse
};