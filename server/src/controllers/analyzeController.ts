import asyncHandler from "../middleware/asyncHandler";
import prisma from "../utils/prisma";

export const systemInfo = asyncHandler(async (req, res, next) => {
  // visitors

  const customers = await prisma.customer.count();

  const products = await prisma.product.count();
  res.status(200).json({ customers, products });
});
