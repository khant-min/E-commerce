import express from "express";
import authRoute from "./routes/authRoute";
import root from "./routes/root";

const app = express();
const router = express.Router({ mergeParams: true });

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/", root);

router.use("/auth", authRoute);

app.use("/api", router);

app.listen(PORT, () => console.log(`Server is running at port -> ${PORT}`));
