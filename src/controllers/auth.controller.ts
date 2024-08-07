import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import TypedRequestBody from "../type/TypedRequestBody";
import { Prisma } from "@prisma/client";
import UserModel from "../models/UserModel";
import { LoginRequestType } from "../type/User";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { serialize } from "cookie";

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

  static async login(
    req: TypedRequestBody<LoginRequestType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserModel.validateLogin(req);
      if (!user) {
        throw Error("email or password wrong");
      }
      const token = jwt.sign(
        user,
        process.env.PRIVATE_KEY || "hello",
        {
          expiresIn: 60 * 60 * 24 * 30,
        },
        (_err, token) => {
          const serialized = serialize("token", token ?? "", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
          });
          res.setHeader("Set-Cookie", serialized);
          res.status(StatusCodes.OK).json({
            status: "success",
            data: {
              user: user,
              token: token,
            },
          });
        }
      );
    } catch (e) {
      next(e);
    }
  }

  static me(req: Request, res: Response, next: NextFunction) {
    try {
      const verify = jwt.verify(
        req.cookies.token,
        process.env.PRIVATE_KEY ?? ""
      );
      if (verify) {
        res.status(StatusCodes.OK).json({
          status: "success",
          data: verify,
        });
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          status: "error",
          message: "unauthorized",
        });
      }
    } catch (e) {
      next(e);
    }
  }

  static async logout(req: Request, res: Response) {
    const { cookies } = req;

    const jwt = cookies.token;

    if (!jwt) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: "error",
        error: "Unauthorized",
      });
    }

    const serialized = serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({
      status: "success",
      message: "Logged out",
    });
  }
}

export { AuthController };
