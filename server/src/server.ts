import express from "express";
import prisma from "./utils/prisma";
import authRoute from "./routes/authRoute";
import root from "./routes/root";
import productRoute from "./routes/productRoute";
import errorHandler from "./middleware/errorHandler";
import { authenticateToken } from "./middleware/authHandler";
import cookieParser from "cookie-parser";

const app = express();
const router = express.Router({ mergeParams: true });

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use("/", root);
app.use("/auth", authRoute);

// protected routes
router.use(authenticateToken);

router.use("/products", productRoute);
// router.use("/products", (req, res) => res.send("products"));

app.use("/api", router);
app.use("*", (req, res) => res.status(404).send("404 | Not Found"));

app.use(errorHandler);

const server = app.listen(PORT, () =>
  console.log(`Server is running at port -> ${PORT}`)
);

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Closing server and disconnecting Prisma.");
  await prisma.$disconnect();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM. Closing server and disconnecting Prisma.");
  await prisma.$disconnect();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
