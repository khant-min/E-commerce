"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAProduct = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getAllProducts = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const prisma_1 = __importDefault(require("../utils/prisma"));
/**
 * Get All Products
 * @route GET api/products
 * @access public (All)
 * @retunr all products
 */
exports.getAllProducts = (0, asyncHandler_1.default)(async (req, res, next) => {
    const products = await prisma_1.default.product.findMany();
    res.status(200).json(products);
});
/**
 * Get A Product Customer Choose
 * @route POST api/products/secure
 * @access private (Admin)
 * @returns successful message
 */
exports.createProduct = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { name, brand, category } = req.body;
    if (!name || !brand || !category)
        return next(new errorResponse_1.default("Please fill all required fields", 400));
    await prisma_1.default.product.create({
        data: { name, brand, category },
    });
    res.status(201).json({ message: "New product created successfully" });
});
/**
 * Update A Product Admin Choose
 * @route PUT api/products/secure
 * @access private (Admin)
 * @returns successful message
 */
exports.updateProduct = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { id, name, brand, category } = req.body;
    if (!id)
        return next(new errorResponse_1.default("Product ID is required", 400));
    const product = await prisma_1.default.product.findUnique({ where: { id } });
    if (!product)
        return next(new errorResponse_1.default("Product not found", 404));
    if (name === undefined || name.trim() === "") {
        return next(new errorResponse_1.default("Name is required", 400));
    }
    await prisma_1.default.product.update({
        where: { id: product.id },
        data: { name, brand, category },
    });
    res.status(200).json({ message: "Product updated successfully" });
});
/**
 * Delete A Product Admin Choose
 * @route DELETE api/products/secure
 * @access private (Admin)
 */
exports.deleteProduct = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { id } = req.body;
    if (!id)
        return next(new errorResponse_1.default("Product ID is required", 400));
    const product = await prisma_1.default.product.findUnique({ where: { id } });
    if (!product)
        return next(new errorResponse_1.default("Product isn't existed", 404));
    await prisma_1.default.product.delete({ where: { id } });
    res.sendStatus(204);
});
/**
 * Get A Product Customer Choose
 * @route GET api/products/:id
 * @access public (All)
 * @returns chosen product
 */
exports.getAProduct = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if (!id)
        return next(new errorResponse_1.default("Product not found", 404));
    const product = await prisma_1.default.product.findUnique({
        where: { id: Number(id) },
    });
    if (product === null)
        return next(new errorResponse_1.default("Invalid product ID", 400));
    res.status(200).json(product);
});
//# sourceMappingURL=productController.js.map