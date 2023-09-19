"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (user) => jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
});
exports.generateAccessToken = generateAccessToken;
const authenticateToken = (req, res, next) => {
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
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authHandler.js.map