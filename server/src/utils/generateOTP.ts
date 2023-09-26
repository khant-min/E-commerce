import crypto from "crypto";

export function generateCustomerOTP(): string {
  const randomDigits = crypto.randomBytes(4).readUIntBE(0, 4);
  return String(randomDigits).slice(0, 6);
}

export function generateAdminOTP(): string {
  const randomLetter1 = String.fromCharCode(
    65 + Math.floor(Math.random() * 26)
  );
  const randomDigits = crypto.randomBytes(4).readUIntBE(0, 4);
  return `${randomLetter1}-${String(randomDigits).slice(0, 8)}`;
}
