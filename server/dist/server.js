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
// protected routes
router.use(authHandler_1.verifyToken);
router.use("/products", productRoute_1.default);
router.use("customers", customerRoute_1.default);
// router.use("/products", (req, res) => res.send("products"));
app.use("/api", router);
app.use("*", (req, res) => res.status(404).send("404 | Not Found"));
app.use(errorHandler_1.default);
const server = app.listen(PORT, () => console.log(`Server is running at port -> ${PORT}`));
process.on("SIGINT", async () => {
    console.log("Received SIGINT. Closing server and disconnecting Prisma.");
    await prisma_1.default.$disconnect();
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});
process.on("SIGTERM", async () => {
    console.log("Received SIGTERM. Closing server and disconnecting Prisma.");
    await prisma_1.default.$disconnect();
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});
//# sourceMappingURL=server.js.map