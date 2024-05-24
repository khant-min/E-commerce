import asyncHandler from "../middleware/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import prisma from "../utils/prisma";

export const getAllCustomers = asyncHandler(async (req, res, next) => {
  const customers = await prisma.customer.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      createdAt: true,
      updatedAt: true,
      refreshToken: true,
    },
  });

  res.status(200).json({ customers });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const { id, name, email, phoneNumber } = req.body;

  if (!id) return next(new ErrorResponse("Customer ID is required", 400));

  const findCustomerById = await prisma.customer.findUnique({
    where: { id },
  });

  if (!findCustomerById)
    return next(new ErrorResponse("Invalid customer ID", 400));

  if (name) findCustomerById.name = name;
  if (email) findCustomerById.email = email;
  if (phoneNumber) findCustomerById.name = phoneNumber;
  res.status(200).json("Profile updated successfully.");
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const { id, oldPassword, newPassword } = req.body;

  if (!id) return next(new ErrorResponse("Customer ID is required", 400));

  const findCustomerById = await prisma.customer.findUnique({
    where: { id },
  });

  if (!findCustomerById)
    return next(new ErrorResponse("Invalid customer ID", 400));

  if (oldPassword !== findCustomerById.password)
    return next(new ErrorResponse("Wrong password.", 400));

  findCustomerById.password = newPassword;

  res.status(200).json("New password updated successfully.");
});
