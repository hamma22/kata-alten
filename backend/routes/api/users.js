const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users.controller");
const requireAuth = require("../../middleware/auth");

router.use(requireAuth);

router.get("/", userController.getUsers);
router.get("/me", userController.getCurrentUser);
router.get("/:id", userController.getUserById);

module.exports = router;
