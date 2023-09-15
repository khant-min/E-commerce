import express from "express";
import authRoute from "./routes/authRoute";
import root from "./routes/root";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();
const router = express.Router({ mergeParams: true });

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/", root);

router.use("/auth", authRoute);

app.use("/api", router);

app.use(async () => {
  console.log("connection closed...");

  await prisma.$disconnect();
});

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
