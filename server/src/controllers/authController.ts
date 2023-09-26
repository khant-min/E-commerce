import { AdminProps, AuthorizedUser, CustomerProps } from "../types";
import bcrypt from "bcrypt";
import asyncHandler from "../middleware/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import prisma from "../utils/prisma";
import { generateToken } from "../middleware/authHandler";

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

  await prisma.customer.create({
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
 * @returns successful message
 * @access public (Customer)
 */
export const logoutCustomer = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email)
    return next(new ErrorResponse("Please filled required fields", 400));

  const foundCustomer = await prisma.customer.findUnique({ where: { email } });

  if (!foundCustomer)
    return next(new ErrorResponse("Credentials are invalid", 401));

  await prisma.customer.update({
    where: { id: foundCustomer.id },
    data: { refreshToken: "" },
  });

  res.status(200).json({ message: "Deleted successfully" });
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
    return next(new ErrorResponse("Credentials are invalid...", 401));

  // const matchPassword = await bcrypt.compare(password, foundAdmin.password);
  // if (!matchPassword)
  //   return next(new ErrorResponse("Credentials are invalid", 401));

  const admin: AuthorizedUser = { email, role: foundAdmin.role };
  const accessToken = generateToken(admin);
  const refreshToken = generateToken(admin, "Refresh", "1d");

  await prisma.admin.update({
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
export const logoutAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email)
    return next(new ErrorResponse("Please filled required fields", 400));

  const foundAdmin = await prisma.admin.findUnique({ where: { email } });

  if (!foundAdmin)
    return next(new ErrorResponse("Credentials are invalid", 401));

  await prisma.admin.update({
    where: { id: foundAdmin.id },
    data: { refreshToken: "" },
  });

  res.status(200).json({ message: "Deleted successfully" });
});
