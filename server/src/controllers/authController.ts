import { Request, Response } from "express";
import { UserProps } from "../types";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const registerCustomer = async (req: Request, res: Response) => {
  const { name, email, password, phoneNumber }: UserProps = req.body;
  if (!name || !email || !password || !phoneNumber)
    return res.status(400).json({ message: "Please filled required fields" });

  const findExistingUser = await prisma.customer.findFirst({
    where: {
      OR: [{ email }, { phoneNumber }],
    },
  });

  if (findExistingUser)
    return res.status(409).json({ message: "User already exists" });

  const salt = 10;
  const hashPassword = await bcrypt.hash(password, salt);
  console.log("reach here", hashPassword);

  const user = await prisma.customer.create({
    data: { name, email, password: hashPassword, phoneNumber },
  });

  res.status(201).json(user);
};

export const loginCustomer = async (req: Request, res: Response) => {
  const { email, password }: Pick<UserProps, "email" | "password"> = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Please filled required fields" });

  const foundUser = await prisma.customer.findFirst({ where: { email } });

  if (!foundUser)
    return res.status(401).json({ message: "Credentials are invalid" });

  const matchPassword = await bcrypt.compare(password, foundUser.password);
  if (!matchPassword)
    return res.status(401).json({ message: "Credentials are invalid" });

  res.status(200).json("User login!");
};

export const logoutCustomer = (req: Request, res: Response) => {
  res.send("logoout!");
};
