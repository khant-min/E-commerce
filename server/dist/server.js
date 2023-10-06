"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("./utils/prisma"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const root_1 = __importDefault(require("./routes/root"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const customerRoute_1 = __importDefault(require("./routes/customerRoute"));
const serviceRoute_1 = __importDefault(require("./routes/serviceRoute"));
const notFound_1 = __importDefault(require("./routes/notFound"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const authHandler_1 = require("./middleware/authHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const router = express_1.default.Router({ mergeParams: true });
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/", root_1.default);
app.use("/auth", authRoute_1.default);
router.use("/services", serviceRoute_1.default);
router.use(authHandler_1.verifyToken);
router.use("/products", productRoute_1.default);
router.use("/customers", customerRoute_1.default);
app.use("/api", router);
app.use("*", notFound_1.default);
app.use(errorHandler_1.default);
const server = app.listen(PORT, () => console.log(`Server is running at port -> ${PORT}`));
process.on("SIGINT", async () => {
    await prisma_1.default.$disconnect();
    server.close(() => process.exit(0));
});
process.on("SIGTERM", async () => {
    await prisma_1.default.$disconnect();
    server.close(() => process.exit(0));
});
//# sourceMappingURL=server.js.map