import {
  AdminProps,
  AuthorizedUser,
  CustomerProps,
  DecodedData,
} from "../types";
import bcrypt from "bcrypt";
import asyncHandler from "../middleware/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import prisma from "../utils/prisma";
import { generateToken } from "../middleware/authHandler";
import jwt, { VerifyErrors } from "jsonwebtoken";

/**
 * Register New Customer
 * @route POST auth/register
 * @param req name, email, password, phoneNumber
 * @returns succesful message
 * @access public (Customer)
 */
export const registerCustomer = asyncHandler(async (req, res, next) => {
  const { name, email, password, phoneNumber }: CustomerProps = req.body;
  if (!name || !email || !password || !phoneNumber)
    return next(new ErrorResponse("Please filled required fields", 400));

  const findExistingCustomer = await prisma.customer.findFirst({
    where: {
      OR: [{ email }, { phoneNumber }],
    },
  });

  if (findExistingCustomer)
    return next(new ErrorResponse("User already exists", 409));

  const salt = 10;
  const hashPassword = await bcrypt.hash(password, salt);

  const customer = await prisma.customer.create({
    data: { name, email, password: hashPassword, phoneNumber },
  });

  res.status(201).json(`Customer ${name} created successfully`);
});

/**
 * Customer Login
 * @route POST auth/login
 * @param req email, password
 * @access public (Customer)
 * @returns Access Token, Refresh Token
 */
export const loginCustomer = asyncHandler(async (req, res, next) => {
  const { email, password }: Pick<CustomerProps, "email" | "password"> =
    req.body;

  if (!email || !password)
    return next(new ErrorResponse("Please filled required fields", 400));

  const foundCustomer = await prisma.customer.findUnique({ where: { email } });

  if (!foundCustomer)
    return next(new ErrorResponse("Credentials are invalid", 401));

  const matchPassword = await bcrypt.compare(password, foundCustomer.password);
  if (!matchPassword)
    return next(new ErrorResponse("Credentials are invalid", 401));

  const cus: AuthorizedUser = { email, role: foundCustomer.role };
  const accessToken = generateToken(cus);
  const refreshToken = generateToken(cus, "Refresh", "1d");

  await prisma.customer.update({
    where: { id: foundCustomer.id },
    data: { refreshToken },
  });

  res.cookie("jwt", refreshToken, {
    // httpOnly: true,
    // secure: true,
    // sameSite: "none",
    // maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ accessToken });
});

/**
 * Customer Logout
 * @route POST api/auth/logout
 * @access public (Customer)
 */
export const logoutCustomer = asyncHandler(async (req, res, next) => {
  res.send("logoout!");
});

/**
 * Admin Login
 * @route POST auth/admin/login
 * @param req email, password
 * @access private (Admin)
 */
export const loginAdmin = asyncHandler(async (req, res, next) => {
  const { email, password }: Pick<AdminProps, "email" | "password"> = req.body;

  if (!email || !password)
    return next(new ErrorResponse("Please filled required fields", 400));

  const foundAdmin = await prisma.admin.findUnique({ where: { email } });

  if (!foundAdmin)
    return next(new ErrorResponse("Credentials are invalid", 401));

  const matchPassword = await bcrypt.compare(password, foundAdmin.password);
  if (!matchPassword)
    return next(new ErrorResponse("Credentials are invalid", 401));

  const admin: AuthorizedUser = { email, role: foundAdmin.role };
  const accessToken = generateToken(admin);
  const refreshToken = generateToken(admin, "Refresh", "1d");

  await prisma.customer.update({
    where: { id: foundAdmin.id },
    data: { refreshToken },
  });

  res.cookie("jwt", refreshToken, {
    // httpOnly: true,
    // secure: true,
    // sameSite: "none",
    // maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ accessToken });
});

/**
 * Admin Logout
 * @route POST auth/admin/logout
 * @access private (Admin)
 */
export const logoutAdmin = asyncHandler(async (req, res, next) => {});

/**
 * Get Refresh Token
 * @route GET auth/refresh
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
      res.status(200).json(accessToken);
    }
  );
});
