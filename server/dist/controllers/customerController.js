"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCustomers = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const prisma_1 = __importDefault(require("../utils/prisma"));
exports.getAllCustomers = (0, asyncHandler_1.default)(async (req, res, next) => {
    const customers = await prisma_1.default.customer.findMany();
    res.status(200).json({ customers });
});
//# sourceMappingURL=customerController.js.map