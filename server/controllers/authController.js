const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(401)
      .json({ message: "Email and passwords are required" });

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.sendStatus(401);

  const accessToken = jwt.sign(
    {
      username: foundUser.username,
      email: foundUser.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30s",
    }
  );

  const refreshToken = jwt.sign(
    {
      username: foundUser.username,
      email: foundUser.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ refreshToken, name: foundUser.username });
};

module.exports = { handleLogin };
