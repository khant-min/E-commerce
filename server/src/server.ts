import express from "express";

const app = express();
const router = express.Router({ mergeParams: true });

const PORT = process.env.PORT || 8080;

app.use(express.json());

router.use("/test", (req, res) => {
  res.send("hello");
});

app.use("/api", router);

app.listen(PORT, () => console.log(`Server is running at port -> ${PORT}`));
