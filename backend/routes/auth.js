import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.json({ token });
});

export default router;