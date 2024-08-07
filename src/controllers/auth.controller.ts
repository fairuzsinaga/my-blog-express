import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import TypedRequestBody from "../type/TypedRequestBody";
import { Prisma } from "@prisma/client";
import UserModel from "../models/UserModel";

class AuthController {
  static async register(
    req: TypedRequestBody<Prisma.UserCreateInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const isNotUnique = await UserModel.countUserByEmail(req.body.email);
      if (isNotUnique) {
        throw Error("email has been taken");
      }
      const createUser = await UserService.create(req.body);
      res.send({
        message: "success",
        data: createUser,
      });
    } catch (e) {
      next(e);
    }
  }
}

export { AuthController };
