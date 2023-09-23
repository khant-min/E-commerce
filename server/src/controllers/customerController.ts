import asyncHandler from "../middleware/asyncHandler";
import prisma from "../utils/prisma";

export const getAllCustomers = asyncHandler(async (req, res, next) => {
  const customers = await prisma.customer.findMany({
    select: { password: false },
  });

  res.status(200).json({ customers });
});
