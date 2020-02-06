const request = require("supertest")
const db = require("../../data/dbConfig")
const server = require("../../index")

beforeEach(async () => {
  await db.seed.run()
})

describe("auth router", () => {
  test("register a new user", async () => {
    const res = await request(server)
      .post("/api/register")
      .send({ email: "me4@me.com", name: "me", password: "password" })
    expect(res.status).toBe(201)
  })
  test("register a new user", async () => {
    const res = await request(server)
      .post("/api/register")
      .send({ email: "me5@me.com", name: "me", password: "password" })
    expect(res.body.email).toBe("me5@me.com")
  })
  test("login user with correct password", async () => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "me@me.com", password: "password" })
    expect(res.status).toBe(200)
  })
  test("login user with incorrect password", async () => {
    const res = await request(server)
      .post("/api/login")
      .send({ email: "me@me.com", password: "password@" })
    expect(res.status).toBe(401)
  })
})
