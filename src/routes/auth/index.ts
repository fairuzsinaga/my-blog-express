import express, { Request, Response } from "express";
import TypedRequestBody from "../../type/TypedRequestBody";
import {LoginRequestType} from "../../type/User";
import { Prisma } from "@prisma/client";
import UserService from "../../services/UserService";

const AuthRoutes = express()

AuthRoutes.post("/login", (req: TypedRequestBody<LoginRequestType>, res: Response) => {
  const body = req.body;
  res.status(200).send({
    email: body.email,
    password: body.password
  })
})

AuthRoutes.post("/register", async (req: TypedRequestBody<Prisma.UserCreateInput>, res: Response) => {
  try {
    const createUser = await UserService.create(req.body)
    res.send({
      message: "success",
      data: createUser
    })
  } catch (e) {
    res.status(500)
        .send({
          "message": "Internal Server Error"
        })
  }
})

export default AuthRoutes