import { z } from "zod";
import { trimIfEmptyOrSpaces } from "../utils/string.utils";
import { PrismaClient } from "@prisma/client";

const userTable = new PrismaClient().user;

const registerUserSchema = z.object({
  email: z
    .string()
    .email()
    .min(1)
    .refine((val) => val.trim().length > 0, {
      message: "email field is required",
    }),
  name: z.string().refine((val) => val.trim().length > 0, {
    message: "name field is required",
  }),
  password: z
    .string()
    .max(8)
    .refine((val) => val.trim().length > 0, {
      message: "password field is required",
    }),
});

export { registerUserSchema };
