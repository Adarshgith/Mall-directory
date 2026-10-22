import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminEmail || !adminPassword || !jwtSecret) {
    return res
      .status(500)
      .json({ error: "Admin login is not configured on this server" });
  }

  if (
    typeof email !== "string" ||
    email.trim().toLowerCase() !== adminEmail ||
    typeof password !== "string" ||
    password !== adminPassword
  ) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ email: adminEmail }, jwtSecret, {
    expiresIn: "24h",
  });

  res.json({ token });
});

export default router;