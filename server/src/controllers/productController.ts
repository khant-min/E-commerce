import asyncHandler from "../middleware/asyncHandler";
import { ProductProps } from "../types";
import ErrorResponse from "../utils/errorResponse";
import prisma from "../utils/prisma";
import { productSchema, updateProductSchema } from "../utils/productSchema";

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
  // used Joi for validation
  const { error, value } = productSchema.validate(req.body);

  if (error) return next(new ErrorResponse(error.details[0].message, 400));

  const {
    name,
    sku,
    brand,
    categoryId,
    description,
    costPrice,
    sellPrice,
    image,
    quantityInStock,
    weight,
    size,
    color,
    material,
    expirationDate,
    warehouseLocation,
    stockStatus,
    width,
    height,
    length,
    supplierId,
    addedDates,
  }: ProductProps = value;

  const createdProduct = await prisma.product.create({
    data: {
      name,
      sku,
      brand,
      categoryId,
      description,
      costPrice,
      sellPrice,
      quantityInStock,
      weight,
      size,
      color,
      material,
      expirationDate,
      warehouseLocation,
      stockStatus,
      width,
      height,
      length,
      supplierId,
      addedDates,
    },
  });

  await prisma.images.create({ data: { image, productId: createdProduct.id } });

  res.status(201).json({ message: "New product created successfully" });
});

/**
 * Update A Product Admin Choose
 * @route PUT api/products/secure
 * @access private (Admin)
 * @returns successful message
 */
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { error, value } = updateProductSchema.validate(req.body);

  if (error) return next(new ErrorResponse(error.details[0].message, 400));

  const {
    id,
    name,
    sku,
    brand,
    categoryId,
    description,
    costPrice,
    sellPrice,
    image,
    quantityInStock,
    weight,
    size,
    color,
    material,
    expirationDate,
    warehouseLocation,
    stockStatus,
    width,
    height,
    length,
    supplierId,
    addedDates,
  }: ProductProps & { id: number } = value;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) return next(new ErrorResponse("Product not found", 404));

  const updatedProduct = await prisma.product.update({
    where: { id: product.id },
    data: {
      name,
      sku,
      brand,
      categoryId,
      description,
      costPrice,
      sellPrice,
      quantityInStock,
      weight,
      size,
      color,
      material,
      expirationDate,
      warehouseLocation,
      stockStatus,
      width,
      height,
      length,
      supplierId,
      addedDates,
    },
  });

  if (!updatedProduct) return next(new ErrorResponse("Update failed!", 500));

  await prisma.images.updateMany({
    where: { productId: updatedProduct.id },
    data: { image },
  });

  res.status(200).json({ message: "Product updated successfully" });
});

/**
 * Delete A Product Admin Choose
 * @route DELETE api/products/secure
 * @access private (Admin)
 */
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new ErrorResponse("Product ID is required", 400));

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  if (!product) return next(new ErrorResponse("Product isn't existed", 404));

  await prisma.images.deleteMany({ where: { productId: Number(id) } });

  await prisma.product.delete({ where: { id: Number(id) } });

  res.status(204).json({ message: "Product deleted successfully!" });
});

/**
 * Get A Product Customer Choose
 * @route GET api/products/:id
 * @access public (All)
 * @returns chosen product
 */
export const getAProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new ErrorResponse("Please provide an id.", 400));

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product)
    return next(new ErrorResponse("No product found with that id.", 404));

  res.status(200).json(product);
});

export const getProductByCategory = asyncHandler(async (req, res, next) => {
  const categoryId = req.params;

  if (!categoryId)
    return next(
      new ErrorResponse(
        "Please provide a category id to search related products.",
        400
      )
    );

  const category = await prisma.category.findUnique({
    where: { id: Number(categoryId) },
  });

  if (!category)
    return next(new ErrorResponse("No category found with that id.", 404));

  const products = await prisma.product.findMany({
    where: { categoryId: category.id },
  });

  if (products.length <= 0)
    return next(
      new ErrorResponse("No products found with that category id.", 404)
    );

  res.status(200).json(products);
});
