"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user, token = "Access", expDate = "30s") => jsonwebtoken_1.default.sign(user, (token === "Access"
    ? process.env.ACCESS_TOKEN_SECRET
    : process.env.REFRESH_TOKEN_SECRET), {
    expiresIn: expDate,
});
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err)
            return res.sendStatus(403);
        req.customerInfo = data;
        next();
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=authHandler.js.map