"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.logoutAdmin = exports.loginAdmin = exports.logoutCustomer = exports.loginCustomer = exports.registerCustomer = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const authHandler_1 = require("../middleware/authHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Register New Customer
 * @route POST auth/register
 * @param req name, email, password, phoneNumber
 * @returns succesful message
 * @access public (Customer)
 */
exports.registerCustomer = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { name, email, password, phoneNumber } = req.body;
    if (!name || !email || !password || !phoneNumber)
        return next(new errorResponse_1.default("Please filled required fields", 400));
    const findExistingCustomer = await prisma_1.default.customer.findFirst({
        where: {
            OR: [{ email }, { phoneNumber }],
        },
    });
    if (findExistingCustomer)
        return next(new errorResponse_1.default("User already exists", 409));
    const salt = 10;
    const hashPassword = await bcrypt_1.default.hash(password, salt);
    const customer = await prisma_1.default.customer.create({
        data: { name, email, password: hashPassword, phoneNumber },
    });
    res.status(201).json(`Customer ${name} created successfully`);
});
/**
 * Customer Login
 * @route POST auth/login
 * @param req email, password
 * @access public (Customer)
 * @returns Access Token, Refresh Token
 */
exports.loginCustomer = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new errorResponse_1.default("Please filled required fields", 400));
    const foundCustomer = await prisma_1.default.customer.findUnique({ where: { email } });
    if (!foundCustomer)
        return next(new errorResponse_1.default("Credentials are invalid", 401));
    const matchPassword = await bcrypt_1.default.compare(password, foundCustomer.password);
    if (!matchPassword)
        return next(new errorResponse_1.default("Credentials are invalid", 401));
    const cus = { email, role: foundCustomer.role };
    const accessToken = (0, authHandler_1.generateToken)(cus);
    const refreshToken = (0, authHandler_1.generateToken)(cus, "Refresh", "1d");
    await prisma_1.default.customer.update({
        where: { id: foundCustomer.id },
        data: { refreshToken },
    });
    res.cookie("jwt", refreshToken, {
    // httpOnly: true,
    // secure: true,
    // sameSite: "none",
    // maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
});
/**
 * Customer Logout
 * @route POST api/auth/logout
 * @access public (Customer)
 */
exports.logoutCustomer = (0, asyncHandler_1.default)(async (req, res, next) => {
    res.send("logoout!");
});
/**
 * Admin Login
 * @route POST auth/admin/login
 * @param req email, password
 * @access private (Admin)
 */
exports.loginAdmin = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new errorResponse_1.default("Please filled required fields", 400));
    const foundAdmin = await prisma_1.default.admin.findUnique({ where: { email } });
    if (!foundAdmin)
        return next(new errorResponse_1.default("Credentials are invalid", 401));
    const matchPassword = await bcrypt_1.default.compare(password, foundAdmin.password);
    if (!matchPassword)
        return next(new errorResponse_1.default("Credentials are invalid", 401));
    const admin = { email, role: foundAdmin.role };
    const accessToken = (0, authHandler_1.generateToken)(admin);
    const refreshToken = (0, authHandler_1.generateToken)(admin, "Refresh", "1d");
    await prisma_1.default.customer.update({
        where: { id: foundAdmin.id },
        data: { refreshToken },
    });
    res.cookie("jwt", refreshToken, {
    // httpOnly: true,
    // secure: true,
    // sameSite: "none",
    // maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
});
/**
 * Admin Logout
 * @route POST auth/admin/logout
 * @access private (Admin)
 */
exports.logoutAdmin = (0, asyncHandler_1.default)(async (req, res, next) => { });
/**
 * Get Refresh Token
 * @route GET auth/refresh
 * @access public (All)
 */
exports.refreshToken = (0, asyncHandler_1.default)(async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt)
        return next(new errorResponse_1.default("Unauthorized", 401));
    const refreshToken = cookies.jwt;
    const foundUser = await prisma_1.default.customer.findFirst({
        where: { refreshToken },
    });
    if (!foundUser)
        return next(new errorResponse_1.default("Invalid token", 403));
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        console.log("foundUser: ", foundUser);
        console.log("decoded data: ", decoded);
        if (err || foundUser.email !== decoded.email)
            return next(new errorResponse_1.default("Expired token", 403));
        const accessToken = (0, authHandler_1.generateToken)({
            email: decoded.email,
            role: decoded.role,
        });
        res.status(200).json(accessToken);
    });
});
//# sourceMappingURL=authController.js.map