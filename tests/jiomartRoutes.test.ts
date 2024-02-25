// tests/jiomartRoutes.test.ts
import request from "supertest";
import { app, server } from "../app"; // import your Express app

describe("Jiomart Routes", () => {
  it("should fetch Jiomart Atta data", async () => {
    const res = await request(app).get("/api/jiomartatta");

    expect(res.statusCode).toEqual(200);
    // Add more assertions about the response here as needed
  });

  it("should fetch Jiomart vegetables data", async () => {
    const res = await request(app).get("/api/jiomartfreshfruits");

    expect(res.statusCode).toEqual(200);
    // Add more assertions about the response here as needed
  });

  it("should fetch Jiomart groceries data", async () => {
    const res = await request(app).get("/api/jiomartfreshvegies");

    expect(res.statusCode).toEqual(200);
    // Add more assertions about the response here as needed
  });

  afterAll((done) => {
    server.close(done);
  });
  // Add more tests for other routes here
});
