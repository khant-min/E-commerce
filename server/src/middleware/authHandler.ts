import { NextFunction, Request, Response } from "express";
import { AuthorizedUser, DecodedData } from "../types";
import jwt from "jsonwebtoken";

export const generateToken = (
  user: AuthorizedUser,
  token: string = "Access",
  expDate: string = "30s"
) =>
  jwt.sign(
    user,
    (token === "Access"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET) as string,
    {
      expiresIn: expDate,
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
      console.log("data", decoded);
      if (err) return res.sendStatus(403);
      if ((decoded as DecodedData).role !== "ADMIN")
        return res.status(401).json({ message: "Not Allowed" });
      req.customerInfo = decoded as DecodedData;
      next();
    }
  );
};
