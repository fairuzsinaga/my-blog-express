import express, { Request, Response, json } from "express";
import dotenv from "dotenv";
import AuthRoutes from "./routes/auth";
import ZodValidation from "./middlewares/zod.middleware";
import ErrorHandler from "./middlewares/errorHandler.middleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(AuthRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: "success",
    message: "hello world",
  });
});

app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`server running in port: ${port}`);
});
