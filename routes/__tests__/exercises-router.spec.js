const request = require("supertest")
const db = require("../../data/dbConfig")
const server = require("../../index")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET || "this is my secret passphrase"

let token

beforeAll(() => {
  const generateToken = (user) => {
    const payload = {
      subject: user.id,
      email: user.email
    }
    const options = {
      expiresIn: "1d"
    }
    return jwt.sign(payload, jwtSecret, options)
  }
  token = generateToken({ id: 1, email: "me@me.com" })
})

beforeEach(async () => {
  await db.seed.run()
  // const login = await request(server)
  //   .post("/api/login")
  //   .send({ email: "me@me.com", password: "password" })
  // token = login.body.token
})

describe("exercises router", () => {
  test("get list of exercises return 200 and json object", async () => {
    const res = await request(server)
      .get("/api/exercises")
      .set({ Authorization: token })
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
  })

  test("get list of exercises return 2 items", async () => {
    const res = await request(server)
      .get("/api/exercises")
      .set({ Authorization: token })
    expect(res.body.length).toBe(2)
  })

  test("add exercise returns 201 and json object", async () => {
    const res = await request(server)
      .post("/api/exercises")
      .send({ name: "Clean", timestamp: Date.now(), region_id: 1 })
      .set({ Authorization: token })
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
  })

  test("add exercise returns name", async () => {
    const res = await request(server)
      .post("/api/exercises")
      .send({ name: "Clean", timestamp: Date.now(), region_id: 1 })
      .set({ Authorization: token })
    expect(res.body.name).toBe("Clean")
  })

  test("delete exercise", async () => {
    const res = await request(server)
      .delete("/api/exercises/1")
      .set({ Authorization: token })
    expect(res.status).toBe(204)
  })

  test("delete exercise", async () => {
    const res = await request(server)
      .delete("/api/exercises/1")
      .set({ Authorization: token })
    const exercises = await db("exercises")
    expect(exercises.length).toBe(5)
  })
})
