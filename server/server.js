require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middlewares/credentials");
const PORT = process.env.PORT || 3500;

connectDB();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/logout", require("./routes/logout"));

mongoose.connection.once("open", () => {
  console.log("mongoose is connected");
  app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
});
