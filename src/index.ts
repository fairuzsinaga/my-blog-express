import express, { Request, Response, json } from "express";
import dotenv from "dotenv";
import AuthRoutes from "./routes/auth";
import ZodValidation from "./middlewares/zod.middleware";
import ErrorHandler from "./middlewares/errorHandler.middleware";
import adminRoutes from "./routes/admin/adminRoutes";
import isAuthenticatedMiddleware from "./middlewares/isAuthenticated.middleware";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(AuthRoutes);
app.use("/admin", adminRoutes, isAuthenticatedMiddleware);

// app.get("/", (req: Request, res: Response) => {
//   res.send({
//     status: "success",
//     message: "hello world",
//   });
// });

app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`server running in port: ${port}`);
});
