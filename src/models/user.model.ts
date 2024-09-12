import { Prisma, PrismaClient } from "@prisma/client";
import { LoginRequestType, UserResponse } from "../type/user.type";
import bcrypt from "bcrypt";
import TypedRequestBody from "../type/typed-request-body.type";

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

  static async validateLogin(
    req: TypedRequestBody<LoginRequestType>
  ): Promise<UserResponse | false> {
    const user = await userTable.findFirst({
      where: {
        email: req.body.email,
      },
    });

    const password = user?.password ?? "";

    if (bcrypt.compareSync(req.body.password, password)) {
      return this.toUserResponse(user as Prisma.UserCreateInput);
    }
    return false;
  }
}

export default UserModel;
