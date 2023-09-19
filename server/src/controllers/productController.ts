import { Request, Response } from "express";
import { ProductProps } from "../types";
import asyncHandler from "../middleware/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import prisma from "../utils/prisma";

/**
 * Get All Products
 * @route GET api/products
 * @access public (All)
 * @retunr all products
 */
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await prisma.product.findMany();
  res.status(200).json(products);
});

/**
 * Get A Product Customer Choose
 * @route POST api/products/secure
 * @access private (Admin)
 * @returns successful message
 */
export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, brand, category }: ProductProps = req.body;

  if (!name || !brand || !category)
    return next(new ErrorResponse("Please fill all required fields", 400));

  await prisma.product.create({
    data: { name, brand, category },
  });

  res.status(201).json({ message: "New product created successfully" });
});

/**
 * Update A Product Admin Choose
 * @route PUT api/products/secure
 * @access private (Admin)
 * @returns successful message
 */
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id, name, brand, category }: ProductProps & { id: number } = req.body;

  if (!id) return next(new ErrorResponse("Product ID is required", 400));

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return next(new ErrorResponse("Product not found", 404));

  if (name === undefined || name.trim() === "") {
    return next(new ErrorResponse("Name is required", 400));
  }

  await prisma.product.update({
    where: { id: product.id },
    data: { name, brand, category },
  });

  res.status(200).json({ message: "Product updated successfully" });
});

/**
 * Delete A Product Admin Choose
 * @route DELETE api/products/secure
 * @access private (Admin)
 */
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id }: { id: number } = req.body;
  if (!id) return next(new ErrorResponse("Product ID is required", 400));

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return next(new ErrorResponse("Product isn't existed", 404));

  await prisma.product.delete({ where: { id } });

  res.sendStatus(204);
});

/**
 * Get A Product Customer Choose
 * @route GET api/products/:id
 * @access public (All)
 * @returns chosen product
 */
export const getAProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new ErrorResponse("Product not found", 404));

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (product === null)
    return next(new ErrorResponse("Invalid product ID", 400));

  res.status(200).json(product);
});
