import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthorizedUser } from "../types";

export const generateAccessToken = (user: any) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "30s",
  });

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, data) => {
    if (err) return res.sendStatus(403);
    req.customerInfo = data as AuthorizedUser;
    next();
  });
};
