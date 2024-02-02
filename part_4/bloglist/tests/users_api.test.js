const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./helpers/test_helper");
const mockData = require("./mock_data/user");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const saltRounds = 10;

  await Promise.all(
    mockData.mockUsers.map(async (user) => {
      user.pwdHash = await bcrypt.hash(user.password, saltRounds);
    })
  );

  await User.insertMany(mockData.mockUsers);
});

describe("Users API GET", () => {
  test("users are returned as correct sized json", async () => {
    const response = await api.get("/api/users").expect(200);
    expect(response.body).toHaveLength(mockData.mockUsers.length);
    expect(response.header["content-type"]).toMatch(/application\/json/);
  });
});

describe("Users API POST", () => {
  test("posting fails with duplicate username", async () => {
    const response = await helper.addUser(api, mockData.duplicateUsername);
    expect(response.status).toBe(400);
    expect(response.body.error).toContain("expected `username` to be unique");
  });

  test("posting fails with short username", async () => {
    const response = await helper.addUser(api, mockData.shortUsername);
    expect(response.status).toBe(400);
    expect(response.body.error).toContain(
      "is shorter than the minimum allowed length (3)."
    );
  });

  test("posting fails with short password", async () => {
    const response = await helper.addUser(api, mockData.shortPassword);
    expect(response.status).toBe(400);
    expect(response.body.error).toEqual(
      "password must be at least 3 characters long"
    );
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
