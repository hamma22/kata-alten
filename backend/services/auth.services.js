const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const { jwtSecret } = require("../config/config");

function generateToken(user) {
  return jwt.sign({ userId: user._id }, jwtSecret, {
    expiresIn: "4h",
  });
}

async function registerUser({ firstName, lastName, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const user = new User({ firstName, lastName, email, password });
  return await user.save();
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid email or password");

  return user;
}

module.exports = { registerUser, loginUser, generateToken };
