import express from "express";
import prisma from "./utils/prisma";
import authRoute from "./routes/authRoute";
import root from "./routes/root";
import productRoute from "./routes/productRoute";
import customerRoute from "./routes/customerRoute";
import errorHandler from "./middleware/errorHandler";
import { verifyToken } from "./middleware/authHandler";
import cookieParser from "cookie-parser";

const app = express();
const router = express.Router({ mergeParams: true });

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use("/", root);
app.use("/auth", authRoute);

// protected routes
router.use(verifyToken);

// router.use("/products", (req, res) => res.send("products"));
router.use("/products", productRoute);
router.use("/customers", customerRoute);

app.use("/api", router);
app.use("*", (req, res) => res.status(404).send("404 | Not Found"));

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
