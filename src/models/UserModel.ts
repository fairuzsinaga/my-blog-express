import { Prisma, PrismaClient } from "@prisma/client";
import { UserResponse } from "../type/User";
import bcrypt from "bcrypt";

const userTable = new PrismaClient().user;

class UserModel {
  static toUserResponse(user: Prisma.UserCreateInput) {
    return {
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    };
  }

  static async create(data: Prisma.UserCreateInput): Promise<UserResponse> {
    const hashPassword = bcrypt.hashSync(data.password, 10);
    data.password = hashPassword;
    const user = await userTable.create({
      data: data,
    });
    return this.toUserResponse(user);
  }

  static async countUserByEmail(email: string): Promise<number> {
    const count = await userTable.count({
      where: {
        email: email,
      },
    });
    return count;
  }
}

export default UserModel;
