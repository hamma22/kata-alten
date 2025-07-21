const logger = require("../config/logger");
const userService = require("../services/users.services");

async function getUsers(req, res) {
  try {
    const users = await userService.listUsers();
    logger.info("Fetched users successfully");
    res.json(users);
  } catch (err) {
    logger.error("Error fetching users:", err);
    res.status(500).json({ error: err.message });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await userService.findUserById(id);
    if (!user) {
      logger.warn(`User with ID ${id} not found`);
      return res.status(404).json({ error: "User not found" });
    }
    logger.info(`Fetched user with ID ${id} successfully`);
    res.json(user);
  } catch (err) {
    logger.error("Error fetching user:", err);
    res.status(500).json({ error: err.message });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedUser = await userService.updateUser({ id, updateData });
    if (!updatedUser) {
      logger.warn(`User with ID ${id} not found`);
      return res.status(404).json({ error: "User not found" });
    }
    logger.info(`Updated user with ID ${id} successfully`);
    res.json(updatedUser);
  } catch (err) {
    logger.error("Error updating user:", err);
    res.status(500).json({ error: err.message });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const deletedUser = await userService.deleteUser(id);
    logger.info(`Deleted user with ID ${id} successfully`);
    res.json(deletedUser);
  } catch (err) {
    logger.error("Error deleting user:", err);
    if (err.message === "User not found") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: err.message });
  }
}

async function getCurrentUser(req, res) {
  res.status(200).json({ user: req.user });
}

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCurrentUser,
};
