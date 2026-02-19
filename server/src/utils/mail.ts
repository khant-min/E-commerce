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

  voucherGenerator(name: string, intro: string, tableRows: any) {
    return this.mail.generate({
      body: {
        name,
        intro,
        table: {
          data: [
            {
              header: "Here is your items: ",
              rows: [
                {
                  columns: [
                    { value: "Item", colspan: 1 },
                    { value: "Count", colspan: 1 },
                    { value: "Price", colspan: 1 },
                    { value: "Total", colspan: 1 },
                  ],
                },
                { rows: tableRows },
              ],
            },
          ],
        },
      },
    });
  }
}

export default new MailService();
