import { Prisma, PrismaClient } from "@prisma/client";
import { UserResponse } from "../type/User";

const userTable = (new PrismaClient()).user

class UserModel {
  
  static toUserResponse(user: Prisma.UserCreateInput) {
    return {
      name: user.name,
      email: user.email,
      created_at: user.created_at
    }
  }
  
  static async create (data: Prisma.UserCreateInput): Promise<UserResponse> {
    const user = await userTable.create({
      data: data
    })
    return this.toUserResponse(user);
  }

}

export default UserModel;
