import asyncHandler from "../middleware/asyncHandler";
import { generateToken } from "../middleware/authHandler";
import ErrorResponse from "../utils/errorResponse";

export const setCookiesTest = (req: any, res: any, next: any) => {
  const refreshToken = generateToken(
    { email: "hi@gmail.com", role: "ADMIN" },
    "Refresh",
    "1d"
  );

  console.log("refresh token: ", refreshToken);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json("Hi cookies...");
};

export const getCookiesTest = (req: any, res: any, next: any) => {
  const cookies = req.cookies;
  if (!cookies.jwt)
    return res.status(404).json({ message: "Cookies are not found" });

  console.log("cookies: ", cookies);

  res.json({ cookies });
};
