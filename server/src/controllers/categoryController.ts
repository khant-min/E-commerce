import asyncHandler from "../middleware/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import prisma from "../utils/prisma";

export const getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await prisma.category.findMany();

  res.status(200).json(categories);
});

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description)
    return next(new ErrorResponse("Please fill all fields", 400));

  await prisma.category.create({ data: { name, description } });

  res
    .status(201)
    .json({ message: `New category ${name} is created successfully.` });
});
