import express from "express";
import request from "supertest";
import authRoutes from "../routes/auth.js";

const originalAuthEnv = {
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
};

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Admin authentication API", () => {
  beforeEach(() => {
    process.env.ADMIN_EMAIL = "admin@mall.com";
    process.env.ADMIN_PASSWORD = "admin123";
    process.env.JWT_SECRET = "test-secret";
  });

  afterAll(() => {
    for (const [key, value] of Object.entries(originalAuthEnv)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  });

  it("accepts case-insensitive email and surrounding whitespace", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: " ADMIN@MALL.COM ", password: "admin123" });

    expect(response.status).toBe(200);
    expect(typeof response.body.token).toBe("string");
  });

  it("rejects an incorrect password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@mall.com", password: "incorrect" });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid email or password");
  });

  it("reports missing auth configuration", async () => {
    delete process.env.JWT_SECRET;

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@mall.com", password: "admin123" });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe(
      "Admin login is not configured on this server",
    );
  });
});
