import express, { NextFunction, Request, Response } from "express";
import TypedRequestBody from "../../type/TypedRequestBody";
import { LoginRequestType } from "../../type/User";
import { Prisma } from "@prisma/client";
import UserService from "../../services/user.service";
import { registerUserSchema } from "../../request/userSchema.request";
import { ZodError } from "zod";
import ZodValidation from "../../middlewares/zod.middleware";
import { AuthController } from "../../controllers/auth.controller";

const AuthRoutes = express();

AuthRoutes.post(
  "/login",
  (req: TypedRequestBody<LoginRequestType>, res: Response) => {
    const body = req.body;
    res.status(200).send({
      email: body.email,
      password: body.password,
    });
  }
);

AuthRoutes.post(
  "/register",
  ZodValidation(registerUserSchema),
  async (
    req: TypedRequestBody<Prisma.UserCreateInput>,
    res: Response,
    next: NextFunction
  ) => {
    await AuthController.register(req, res, next);
  }
);

export default AuthRoutes;
