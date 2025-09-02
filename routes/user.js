import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({ name, email, password: password.trim() });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({
      message: "Login successful",
      userId: user._id,
    }, process.env.JWT_SECRET);
    // return token and message
    res.status(200).json({
      message: "Login successful", token: token, user: {
        id: user._id,
        name: user.name
      }
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findById(req.user.userId);
    res.status(200).json({
      userId: user._id,
      name: user.name
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
})

export default router;