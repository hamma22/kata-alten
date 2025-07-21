const {
  registerUser,
  loginUser,
  generateToken,
} = require("../services/auth.services");
const logger = require("../config/logger");

async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);
    logger.info("User registered successfully:", user.email);
    res.status(201).json({ user });
  } catch (err) {
    logger.error("Error registering user:", err);
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const user = await loginUser(req.body);
    const token = generateToken(user);
    logger.info("User logged in successfully:", user.email);
    res.status(200).json({ token, user });
  } catch (err) {
    logger.error("Error logging in user:", err);
    next(err);
  }
}

module.exports = { register, login };
