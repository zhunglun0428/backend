const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const SALT_ROUNDS = 10;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.checkPassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
