import asyncHandler from "../middleware/asyncHandler";
import prisma from "../utils/prisma";

export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await prisma.order.findMany();
  res.status(200).json(orders);
});

export const createAnOrder = asyncHandler(async (req, res, next) => {
  const {} = req.body;
});
