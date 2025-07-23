const app = require("../../index");
const request = require("supertest");
let token;

beforeAll(async () => {
  const res = await request(app).post("/api/auth/token").send({
    email: "user@user.com",
    password: "User!111",
  });
  token = res.body.token;
});

describe("GET /products", () => {
  it("should return 200 and an array of products when authenticated", async () => {
    const res = await request(app)
      .get("/api/products")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  it("should return 401 if not authenticated", async () => {
    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "Unauthorized");
  });
});
