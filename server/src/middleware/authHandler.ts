import { NextFunction, Request, Response } from "express";
import { AuthorizedUser, DecodedData } from "../types";
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import ErrorResponse from "../utils/errorResponse";

export const generateToken = (
  user: AuthorizedUser,
  token: string = "Access",
  exp: string = "1d" // "30s"
) =>
  jwt.sign(
    user,
    (token === "Access"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET) as string,
    {
      expiresIn: exp,
    }
  );

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.userInfo = decoded as DecodedData;
      next();
    }
  );
};

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.userInfo!;

  if (role !== "ADMIN") return next(new ErrorResponse("Not Allowed", 403));
  next();
});
