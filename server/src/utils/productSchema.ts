import { StockStatus } from "@prisma/client";
import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().trim().required(),
  sku: Joi.string().trim().required(),
  brand: Joi.string().trim().required(),
  categoryId: Joi.number().integer().required(),
  description: Joi.string().trim().required(),
  costPrice: Joi.string().trim().required(),
  sellPrice: Joi.string().trim().required(),
  image: Joi.string().uri().required(),
  quantityInStock: Joi.number().integer().required(),
  weight: Joi.string().trim().required(),
  size: Joi.string().trim().required(),
  color: Joi.string().trim().required(),
  material: Joi.string().trim().required(),
  expirationDate: Joi.string().trim().required(),
  warehouseLocation: Joi.string().trim().required(),
  stockStatus: Joi.string()
    .valid(...Object.values(StockStatus))
    .required(),
  width: Joi.string().trim().required(),
  height: Joi.string().trim().required(),
  length: Joi.string().trim().required(),
  supplierId: Joi.number().integer().required(),
  addedDates: Joi.date().required(),
});

export const updateProductSchema = productSchema.keys({
  id: Joi.number().integer().required(),
});
