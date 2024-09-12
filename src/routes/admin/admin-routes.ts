import express, { Request, Response } from "express";

const adminRoutes = express();
adminRoutes.get("/", (req: Request, res: Response) => {
  res.json({
    data: req.cookies.token,
  });
});

export default adminRoutes;
