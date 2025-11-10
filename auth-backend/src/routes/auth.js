import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { User } from "../models/User.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", [
  body("name").isString().isLength({ min: 2 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 })
], async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email: email.toLowerCase(), password: hashed });
  res.status(201).json({ user });
});

// POST /api/auth/login
router.post("/login", [
  body("email").isEmail(),
  body("password").isString()
], async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id.toString(), email: user.email, role: user.role },
    process.env.JWT_SECRET, { expiresIn: "7d" });

  res.json({ token, user: user.toJSON() });
});

// POST /api/auth/logout
router.post("/logout", (req,res)=>{
  res.json({ message: "Logged out. Please delete token on client." });
});

export default router;

