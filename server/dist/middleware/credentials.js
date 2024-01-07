"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins_1 = __importDefault(require("../config/allowedOrigins"));
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins_1.default.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
};
exports.default = credentials;
//# sourceMappingURL=credentials.js.map