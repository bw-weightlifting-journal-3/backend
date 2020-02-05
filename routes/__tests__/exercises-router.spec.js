const request = require("supertest")
const db = require("../../data/dbConfig")
const server = require("../../index")

beforeEach(async () => {
  await db.seed.run()
})

beforeAll(async (done)=>{
  const login = await request(server)
  .post("/api/login")
  .send({ email: "me@me.com", password: "password" })
  token = login.body.token
  done()
})

describe("exercises router", () => {
  test("get list of exercises return 200 and json object", async () => {

    const res = await request(server).get("/api/exercises").set({Authorization: token})
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
  })

  test("get list of exercises return 3 items", async () => {
    const res = await request(server).get("/api/exercises").set({Authorization: token})
    expect(res.body.length).toBe(2)
  })

  test("add an exercise returns 201 and json object", async () => {
    const res = await request(server)
      .post("/api/exercises")
      .send({ name: "Clean", timestamp: Date.now(), region_id: 1 }).set({Authorization: token})
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
  })

  test("add exercise returns name", async () => {
    const res = await request(server)
    .post("/api/exercises")
    .send({ name: "Clean", timestamp: Date.now(), region_id: 1 }).set({Authorization: token})
    expect(res.body.name).toBe("Clean")
  })

  test("delete exercise", async () => {
    const res = await request(server).delete("/api/exercises/1").set({Authorization: token})
    expect(res.status).toBe(204)
  })

  test("delete exercise", async () => {
    const res = await request(server).delete("/api/exercises/1").set({Authorization: token})
    const exercises = await db("exercises")
    expect(exercises.length).toBe(5)
  })
})