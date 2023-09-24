import asyncHandler from "../middleware/asyncHandler";
import { generateToken } from "../middleware/authHandler";
import ErrorResponse from "../utils/errorResponse";
import prisma from "../utils/prisma";
import { VerifyErrors } from "jsonwebtoken";
import { AdminProps, DecodedData } from "../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * Get Refresh Token
 * @route GET api/services/refresh
 * @returns new access token
 * @access public (All)
 */
export const refreshToken = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return next(new ErrorResponse("Unauthorized", 401));
  const refreshToken = cookies.jwt;

  const foundUser = await prisma.customer.findFirst({
    where: { refreshToken },
  });
  if (!foundUser) return next(new ErrorResponse("Invalid token", 403));

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: VerifyErrors | null, decoded: unknown) => {
      console.log("foundUser: ", foundUser);
      console.log("decoded data: ", decoded);

      if (err || foundUser.email !== (decoded as DecodedData).email)
        return next(new ErrorResponse("Expired token", 403));

      const accessToken = generateToken({
        email: (decoded as DecodedData).email,
        role: (decoded as DecodedData).role,
      });
      res.status(200).json({ accessToken });
    }
  );
});

/**
 * @route POST api/services/secure/newAdmin
 * @returns successful message
 * @access private (Admin)
 */
export const createNewAdmin = asyncHandler(async (req, res, next) => {
  const { name, email, password, phoneNumber }: AdminProps = req.body;
  if (!name || !email || !password || !phoneNumber)
    return next(new ErrorResponse("Please filled required fields", 400));

  const findExistingAdmin = await prisma.admin.findFirst({
    where: {
      OR: [{ email }, { phoneNumber }],
    },
  });

  if (findExistingAdmin)
    return next(new ErrorResponse("User already exists", 409));

  const salt = 10;
  const hashPassword = await bcrypt.hash(password, salt);

  await prisma.admin.create({
    data: { name, email, password: hashPassword, phoneNumber },
  });

  res.status(201).json(`New Admin ${name} created successfully`);
});
