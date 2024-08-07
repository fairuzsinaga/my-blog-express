import { Prisma } from "@prisma/client";
import UserModel from "../models/UserModel";
import { UserResponse } from "../type/User";

export default class UserService {

  static async create(data: Prisma.UserCreateInput): Promise<UserResponse> {
    return await UserModel.create(data);
  }

}