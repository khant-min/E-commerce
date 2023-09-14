import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(() => console.log(`Server is running at port -> ${PORT}`));
