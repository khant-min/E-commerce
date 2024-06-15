import express from "express";
import prisma from "./utils/prisma";
import authRoute from "./routes/authRoute";
import root from "./routes/root";
import productRoute from "./routes/productRoute";
import customerRoute from "./routes/customerRoute";
import serviceRoute from "./routes/serviceRoute";
import categoryRoute from "./routes/categoryRoute";
import supplierRoute from "./routes/supplierRoute";
import analyzeRoute from "./routes/analyzeRoute";
import orderRoute from "./routes/orderRoute";
import notFound from "./routes/notFound";
import errorHandler from "./middleware/errorHandler";
import { verifyToken } from "./middleware/authHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions";
import credentials from "./middleware/credentialHandler";
import { logger } from "./middleware/logHandler";

const app = express();
const router = express.Router({ mergeParams: true });

const PORT = process.env.PORT || 8080;

app.use(logger);
// app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", root);
app.use("/auth", authRoute);

router.use("/services", serviceRoute);
// router.use(verifyToken);
router.use("/products", productRoute);
router.use("/customers", customerRoute);
router.use("/categories", categoryRoute);
router.use("/suppliers", supplierRoute);
router.use("/analyze", analyzeRoute);
router.use("/orders", orderRoute);

app.use("/api", router);
app.use("*", notFound);

app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`Server is running at port -> ${PORT}`)
);

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});
