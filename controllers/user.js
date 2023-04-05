require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = require("../schemas/User.json");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const db = req.db;
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = {
      name: username,
      email: email,
      passwordHash: passwordHash,
    };
    const schema = new mongoose.Schema(userSchema);
    const result = await db.model("user", schema).create(user);
    res.status(200).json({ message: "User created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const db = req.db;
  try {
    // check if user exists
    const schema = new mongoose.Schema(userSchema);
    const result = await db
      .model("user", userSchema)
      .findOne({ name: username });
    if (!result) {
      res.status(400).json({ message: "User not found" });
    } else {
      // check if password is correct
      const passwordHash = result.passwordHash;
      const passwordCorrect = await bcrypt.compare(password, passwordHash);
      if (!passwordCorrect) {
        res.status(400).json({ message: "Password incorrect" });
      } else {
        // generate jwt token
        const token = jwt.sign(
          {
            username: result.username,
            email: result.email,
            id: result._id,
          },
          process.env.JWT_SECRET
        );
        res.status(200).json({ authorization: token });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
};
