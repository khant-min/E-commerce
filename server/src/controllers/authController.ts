import { Request, Response } from "express";

export const registerCustomer = (req: Request, res: Response) => {
  const {} = req.body;
};

export const loginCustomer = (req: Request, res: Response) => {
  res.send("login!");
};

export const logoutCustomer = (req: Request, res: Response) => {
  res.send("logoout!");
};
