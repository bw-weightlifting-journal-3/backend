const request = require("supertest")
const db = require("../../data/dbConfig")
const server = require("../../index")

let token

beforeEach(async () => {
  await db.seed.run()
  const login = await request(server)
    .post("/api/login")
    .send({ email: "me@me.com", password: "password" })
  token = login.body.token
})

describe("users router", () => {
  test("get list of users return 200 and json object", async () => {
    const res = await request(server)
      .get("/api/users")
      .set({ Authorization: token })
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
  })

  test("get list of users return 3 items", async () => {
    const res = await request(server)
      .get("/api/users")
      .set({ Authorization: token })
    expect(res.body.length).toBe(3)
  })

  test("get logged in user return 2 exercises", async () => {
    const res = await request(server)
      .get("/api/user")
      .set({ Authorization: token })
    expect(res.body.exercises.length).toBe(2)
  })

  test("edit user", async () => {
    const res = await request(server)
      .put("/api/user")
      .send({ email: "me9@me.com", name: "Me9", password: "password", goal: "Hello!" })
      .set({ Authorization: token })
    expect(res.body.goal).toMatch(/Hello/)
  })
})
