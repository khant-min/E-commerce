import { StockStatus } from "@prisma/client";

export interface CustomerProps {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "ADMIN" | "CUSTOMER";
}

export interface AdminProps extends CustomerProps {}

export interface ProductProps {
  name: string;
  sku: string;
  brand: string;
  categoryId: string;
  description: string;
  costPrice: number;
  sellPrice: number;
  images: string[];
  quantityInStock: number;
  weight: string;
  size: string;
  color: string;
  material: string;
  expirationDate: string;
  warehouseLocation: string;
  stockStatus: StockStatus;
  width: string;
  height: string;
  length: string;
  supplierId: string;
  addedDates: Date;
}

export interface AuthorizedUser {
  email: string;
  role: "CUSTOMER" | "ADMIN";
}

export interface DecodedData extends AuthorizedUser {
  iat: number;
  exp: number;
}
