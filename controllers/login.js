import bcrypt from "bcryptjs";
import User from "../models/UserModel"; // Assuming this is your User model file
const connectToDatabase = require("../lib/mongodb");

async function loginFunction(req, res) {
  // Ensure MongoDB connection
  await connectToDatabase();

  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Verify password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Return the user data on successful authentication
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

module.exports = { loginFunction };
