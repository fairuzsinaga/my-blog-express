import { Request } from "express";

export default function isAuthenticatedMiddleware(req: Request) {
  console.log(req.cookies.token);
}
