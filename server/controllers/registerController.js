const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    res
      .status(400)
      .json({ message: "Username, email and passwords are required" });

  // check for duplicate emails in db
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) return res.sendStatus(409); // conflict

  try {
    const hash_pwd = await bcrypt.hash(password, 10);
    const result = await User.create({
      username,
      email,
      password: hash_pwd,
    });

    console.log(result);

    res
      .status(201)
      .json({ success: `New user ${username} is successfully created` });
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { handleNewUser };
