"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword =
  exports.verifyOTPCode =
  exports.getOTPCode =
  exports.createNewAdmin =
  exports.refreshToken =
    void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const authHandler_1 = require("../middleware/authHandler");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mail_1 = __importDefault(require("../utils/mail"));
const generateOTP_1 = require("../utils/generateOTP");
/**
 * Get Refresh Token
 * @route GET api/services/refresh
 * @returns new access token
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
  jsonwebtoken_1.default.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      console.log("foundUser: ", foundUser);
      console.log("decoded data: ", decoded);
      if (err || foundUser.email !== decoded.email)
        return next(new errorResponse_1.default("Expired token", 403));
      const accessToken = (0, authHandler_1.generateToken)({
        email: decoded.email,
        role: decoded.role,
      });
      res.status(200).json({ accessToken });
    }
  );
});
/**
 * @route POST api/services/secure/newAdmin
 * @returns successful message
 * @access private (Admin)
 */
exports.createNewAdmin = (0, asyncHandler_1.default)(async (req, res, next) => {
  const { name, email, password, phoneNumber } = req.body;
  if (!name || !email || !password || !phoneNumber)
    return next(
      new errorResponse_1.default("Please filled required fields", 400)
    );
  // const findExistingAdmin = await prisma.admin.findFirst({
  //   where: {
  //     OR: [{ email }, { phoneNumber }],
  //   },
  // });
  // if (findExistingAdmin)
  //   return next(new ErrorResponse("User already exists", 409));
  const findExistingAdmin = await prisma_1.default.admin.findFirst({
    where: {
      OR: [{ email }, { phoneNumber }],
    },
  });
  if (findExistingAdmin)
    return next(new errorResponse_1.default("User already exists", 409));
  const salt = 10;
  const hashPassword = await bcrypt_1.default.hash(password, salt);
  await prisma_1.default.admin.create({
    data: { name, email, password: hashPassword, phoneNumber },
  });
  res.status(201).json(`New Admin ${name} created successfully`);
});
/**
 * @description sends OTP code to customer's email and stores in session
 * @route POST /api/services/getOTPCode
 * @public (All)
 */
exports.getOTPCode = (0, asyncHandler_1.default)(async (req, res, next) => {
  const { name, email, role } = req.body;
  if (!name || !email || !role)
    return next(
      new errorResponse_1.default("Please fill all required fields", 400)
    );
  const otpCode =
    role === "ADMIN"
      ? (0, generateOTP_1.generateAdminOTP)()
      : (0, generateOTP_1.generateCustomerOTP)();
  res.cookie("otpCode", otpCode, {
    // httpOnly: true,
    // secure: true,
    // sameSite: "none",
    // maxAge: 5 * 60 * 1000,
  });
  const message = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP Code",
    html: mail_1.default.mailGenerator(name, otpCode),
  };
  try {
    await mail_1.default.transporter.sendMail(message);
    res.status(200).json({
      message: "We've sent an OTP code to your email, please check...",
    });
  } catch (err) {
    return next(new errorResponse_1.default("Nodemailer error", 500));
  }
});
/**
 * @route POST /api/services/verify-otp
 * @access public (All)
 */
exports.verifyOTPCode = (0, asyncHandler_1.default)(async (req, res, next) => {
  const { otpCode } = req.body;
  const cookies = req.cookies;
  if (!otpCode || !cookies?.otpCode)
    return next(new errorResponse_1.default("Unauthorized", 401));
  cookies.otpCode === otpCode
    ? res.sendStatus(204)
    : next(new errorResponse_1.default("Wrong OTP Code", 401));
});
/**
 * @description validate OTP code
 * @route POST /api/services/resetPassword
 * @access public (All)
 */
exports.resetPassword = (0, asyncHandler_1.default)(async (req, res, next) => {
  const { id, password, role } = req.body;
  if (!id || !password || !role)
    return next(
      new errorResponse_1.default("Please fill required fields", 400)
    );
  const foundUser =
    role === "ADMIN"
      ? await prisma_1.default.admin.findUnique({ where: { id } })
      : await prisma_1.default.customer.findUnique({ where: { id } });
  if (!foundUser)
    return next(new errorResponse_1.default("User not found", 404));
  const salt = 10;
  const hashedPassword = await bcrypt_1.default.hash(password, salt);
  role === "ADMIN"
    ? await prisma_1.default.admin.update({
        where: { id },
        data: { password: hashedPassword },
      })
    : await prisma_1.default.customer.update({
        where: { id },
        data: { password: hashedPassword },
      });
  res.sendStatus(204);
});
//# sourceMappingURL=serviceController.js.map
