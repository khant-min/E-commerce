import nodemailer from "nodemailer";
import Mailgen from "mailgen";

class MailService {
  config = {
    service: "gmail",
    auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
  };

  mail = new Mailgen({
    theme: "default",
    product: { name: "Admin Team", link: "https://mailgen.js" },
  });

  transporter = nodemailer.createTransport(this.config);

  mailGenerator(name: string, code: string) {
    return this.mail.generate({
      body: { name, intro: `Your OTP code is ${code}` },
    });
  }
}

export default new MailService();
