import asyncHandler from "../middleware/asyncHandler";
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
