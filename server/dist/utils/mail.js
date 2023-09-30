"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailgen_1 = __importDefault(require("mailgen"));
class MailService {
    constructor() {
        this.config = {
            service: "gmail",
            auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
        };
        this.mail = new mailgen_1.default({
            theme: "default",
            product: { name: "Admin Team", link: "https://mailgen.js" },
        });
        this.transporter = nodemailer_1.default.createTransport(this.config);
    }
    mailGenerator(name, code) {
        return this.mail.generate({
            body: { name, intro: `Your OTP code is ${code}` },
        });
    }
}
exports.default = new MailService();
//# sourceMappingURL=mail.js.map