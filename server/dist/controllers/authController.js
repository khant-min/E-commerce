"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutAdmin = exports.loginAdmin = exports.logoutCustomer = exports.loginCustomer = exports.registerCustomer = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const authHandler_1 = require("../middleware/authHandler");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Register New Customer
 * @route POST api/auth/register
 * @param req name, email, password, phoneNumber
 * @returns created user
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
 * @route POST api/auth/login
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
    const accessToken = (0, authHandler_1.generateAccessToken)(cus);
    const refreshToken = jsonwebtoken_1.default.sign(cus, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "10d" });
    await prisma_1.default.customer.update({
        where: { id: foundCustomer.id },
        data: { refreshToken },
    });
    res.status(200).json({ accessToken, refreshToken });
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
 * @route POST api/auth/admin/login
 * @param req email, password
 * @access private (Admin)
 */
exports.loginAdmin = (0, asyncHandler_1.default)(async (req, res, next) => { });
/**
 * Admin Logout
 * @route POST api/auth/admin/logout
 * @access private (Admin)
 */
exports.logoutAdmin = (0, asyncHandler_1.default)(async (req, res, next) => { });
//# sourceMappingURL=authController.js.map