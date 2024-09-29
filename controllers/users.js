const connectToDatabase = require("../lib/mongodb");
const UserModel = require("../models/UserModel"); // Adjust the path to your UserModel model
const bcrypt = require("bcryptjs");

async function getAllUsers(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const users = await UserModel.find({});
    return response.json(users);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching users" });
  }
}

async function createUser(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const { email, password, role } = request.body;
    const hashedPassword = await bcrypt.hash(password, 5);

    const user = new UserModel({
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    return response.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return response.status(500).json({ error: "Error creating user" });
  }
}

async function updateUser(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const { id } = request.params;
    const { email, password, role } = request.body;
    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await UserModel.findById(id);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    user.email = email;
    user.password = hashedPassword;
    user.role = role;

    await user.save();
    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({ error: "Error updating user" });
  }
}

async function deleteUser(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  try {
    const { id } = request.params;
    await UserModel.findByIdAndDelete(id);
    return response.status(204).send();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Error deleting user" });
  }
}

async function getUser(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  const { id } = request.params;
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching user" });
  }
}

async function getUserByEmail(request, response) {
  await connectToDatabase(); // Connect to MongoDB

  const { email } = request.params;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({ error: "Error fetching user by email" });
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserByEmail,
};
