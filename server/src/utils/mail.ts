import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { generateAdminOTP, generateCustomerOTP } from "./generateOTP";

class MailService {
  private code = "";

  config = {
    service: "gmail",
    auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
  };

  mail = new Mailgen({
    theme: "default",
    product: { name: "Admin Team", link: "https://mailgen.js" },
  });

  transporter = nodemailer.createTransport(this.config);

  generateOTP(role: "ADMIN" | "CUSTOMER") {
    return (this.code =
      role === "ADMIN" ? generateAdminOTP() : generateCustomerOTP());
  }

  mailGenerator(name: string, role: "ADMIN" | "CUSTOMER" = "CUSTOMER") {
    return this.mail.generate({
      body: { name, intro: `Your OTP code is ${this.generateOTP(role)}` },
    });
  }
}

export default new MailService();
