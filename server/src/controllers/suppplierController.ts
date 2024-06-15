import asyncHandler from "../middleware/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import prisma from "../utils/prisma";

export const getAllSuppliers = asyncHandler(async (req, res, next) => {
  const suppliers = await prisma.supplier.findMany();

  res.status(200).json(suppliers);
});

export const createNewSupplier = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone)
    return next(new ErrorResponse("Please fill all fields", 400));

  await prisma.supplier.create({ data: { name, email, phone } });

  res
    .status(201)
    .json({ message: `New supplier ${name} is created successfully.` });
});
