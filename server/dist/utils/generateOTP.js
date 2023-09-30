"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminOTP = exports.generateCustomerOTP = void 0;
const crypto_1 = __importDefault(require("crypto"));
function generateCustomerOTP() {
    const randomDigits = crypto_1.default.randomBytes(4).readUIntBE(0, 4);
    return String(randomDigits).slice(0, 6);
}
exports.generateCustomerOTP = generateCustomerOTP;
function generateAdminOTP() {
    const randomLetter1 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const randomDigits = crypto_1.default.randomBytes(4).readUIntBE(0, 4);
    return `${randomLetter1}-${String(randomDigits).slice(0, 8)}`;
}
exports.generateAdminOTP = generateAdminOTP;
//# sourceMappingURL=generateOTP.js.map