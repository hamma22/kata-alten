const User = require("../models/User.model");

async function findUserByEmail(email) {
  return User.findOne({ email }).select("+password");
}

async function findUserById(id) {
  return User.findById(id);
}

async function updateUser({ id, updateData }) {
  const user = await User.findByIdAndUpdate(id, updateData, { new: true });
  return user;
}

async function listUsers() {
  return User.find();
}

async function deleteUser(id) {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  await user.remove();
  return user;
}

module.exports = {
  findUserByEmail,
  findUserById,
  updateUser,
  listUsers,
  deleteUser,
};
