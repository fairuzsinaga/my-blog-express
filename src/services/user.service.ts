import { Prisma } from "@prisma/client";
import UserModel from "../models/user.model";
import { UserResponse } from "../type/user.type";

export default class UserService {
  static async create(data: Prisma.UserCreateInput): Promise<UserResponse> {
    return await UserModel.create(data);
  }
}
