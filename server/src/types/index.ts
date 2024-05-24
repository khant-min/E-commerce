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
  brand: string;
  categoryId: number;
  description: string;
  price: string;
  image: string;
}

export interface AuthorizedUser {
  email: string;
  role: "CUSTOMER" | "ADMIN";
}

export interface DecodedData extends AuthorizedUser {
  iat: number;
  exp: number;
}
