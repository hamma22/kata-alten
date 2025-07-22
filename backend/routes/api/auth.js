const express = require("express");
const { register, login } = require("../../controllers/auth.controller");

const router = express.Router();

router.post("/account", register);
router.post("/token", login);

module.exports = router;
