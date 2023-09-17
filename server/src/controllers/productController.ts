import { Request, Response } from "express";
import { ProductProps } from "../types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.status(200).json(products);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, brand, category }: ProductProps = req.body;

  if (!name || !brand || !category)
    return res.status(400).json({ message: "Please fill all required fields" });

  const createdProduct = await prisma.product.create({
    data: { name, brand, category },
  });

  res.status(201).json(createdProduct);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id, name, brand, category }: ProductProps & { id: number } = req.body;

  if (!id) return res.status(400).json({ message: "Product ID is required" });

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (name === undefined || name.trim() === "") {
    return res.status(400).json({ message: "Name is required" });
  }

  const updatedProduct = await prisma.product.update({
    where: { id: product.id },
    data: { name, brand, category },
  });

  res.status(201).json({ updatedProduct });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id }: { id: number } = req.body;
  if (!id) return res.status(400).json({ message: "Product ID is required" });

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product)
    return res.status(404).json({ message: "Product isn't existed" });

  const deleteProduct = await prisma.product.delete({ where: { id } });

  res.status(200).json(deleteProduct);
};

export const getAProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) return res.status(404).json({ message: "Product not found" });

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (product === null)
    return res.status(400).json({ message: "Invalid product ID" });

  res.status(200).json(product);
};
