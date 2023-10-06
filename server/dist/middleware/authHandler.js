"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = __importDefault(require("./asyncHandler"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const generateToken = (user, token = "Access", exp = "1d" // "30s"
) => jsonwebtoken_1.default.sign(user, (token === "Access"
    ? process.env.ACCESS_TOKEN_SECRET
    : process.env.REFRESH_TOKEN_SECRET), {
    expiresIn: exp,
});
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.sendStatus(403);
        req.userInfo = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;
exports.verifyAdmin = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { role } = req.userInfo;
    if (role !== "ADMIN")
        return next(new errorResponse_1.default("Not Allowed", 403));
    next();
});
//# sourceMappingURL=authHandler.js.map