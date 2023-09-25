import crypto from "crypto";

export function generateCustomerOTP(): string {
  const randomDigits = crypto.randomBytes(3).readUIntBE(0, 3);
  return String(randomDigits).padStart(6, "0");
}

export function generateAdminOTP(): string {
  const randomLetter1 = String.fromCharCode(
    65 + Math.floor(Math.random() * 26)
  );
  const randomDigits = crypto.randomBytes(3).readUIntBE(0, 3);
  return `${randomLetter1}-${String(randomDigits).padStart(8, "0")}`;
}
