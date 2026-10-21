import request from "supertest";
import app from "../server.js";
import mongoose from 'mongoose';

describe("Stores API", () => {
  let createdId;

  // GET all stores
  it("GET /api/stores - should return all stores", async () => {
    const res = await request(app).get("/api/stores");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // POST create store
  it("POST /api/stores - should create a new store", async () => {
    const res = await request(app).post("/api/stores").send({
      name: "Test Store",
      category: "Fashion",
      floor: "Level 2",
      description: "Test description",
      openingHours: "9AM - 9PM",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("Test Store");
    createdId = res.body.data._id;
  });

  // PUT update store
  it("PUT /api/stores/:id - should update the store", async () => {
    const res = await request(app).put(`/api/stores/${createdId}`).send({
      name: "Updated Store",
      category: "Fashion",
      floor: "Level 3",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe("Updated Store");
  });

  // DELETE store
  it("DELETE /api/stores/:id - should delete the store", async () => {
    const res = await request(app).delete(`/api/stores/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  // Validation test
  it("POST /api/stores - should fail without required fields", async () => {
    const res = await request(app).post("/api/stores").send({
      description: "Missing name, category, floor",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  afterAll(async () => {
  await mongoose.connection.close();
});
});