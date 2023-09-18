import { Request, Response } from "express";
import { UserProps } from "../types";
import bcrypt from "bcrypt";
import asyncHandler from "../middleware/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Register New Customer
 * @route POST api/auth/register
 * @param req name, email, password, phoneNumber
 * @returns created user
 * @access public (Customer)
 */
export const registerCustomer = asyncHandler(async (req, res, next) => {
  const { name, email, password, phoneNumber }: UserProps = req.body;
  if (!name || !email || !password || !phoneNumber)
    return next(new ErrorResponse("Please filled required fields", 400));

  const findExistingUser = await prisma.customer.findFirst({
    where: {
      OR: [{ email }, { phoneNumber }],
    },
  });

  if (findExistingUser)
    return next(new ErrorResponse("User already exists", 409));

  const salt = 10;
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await prisma.customer.create({
    data: { name, email, password: hashPassword, phoneNumber },
  });

  res.status(201).json(user);
});

/**
 * Customer Login
 * @route POST api/auth/login
 * @param req email, password
 * @access public (Customer)
 */
export const loginCustomer = asyncHandler(async (req, res, next) => {
  const { email, password }: Pick<UserProps, "email" | "password"> = req.body;
  if (!email || !password)
    return next(new ErrorResponse("Please filled required fields", 400));

  const foundUser = await prisma.customer.findFirst({ where: { email } });

  if (!foundUser)
    return next(new ErrorResponse("Credentials are invalid", 401));

  const matchPassword = await bcrypt.compare(password, foundUser.password);
  if (!matchPassword)
    return next(new ErrorResponse("Credentials are invalid", 401));

  res.status(200).json("User login!");
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
 * @route POST api/auth/admin/login
 * @param req email, password
 * @access private (Admin)
 */
export const loginAdmin = asyncHandler(async (req, res, next) => {});

/**
 * Admin Logout
 * @route POST api/auth/admin/logout
 * @access private (Admin)
 */
export const logoutAdmin = asyncHandler(async (req, res, next) => {});
