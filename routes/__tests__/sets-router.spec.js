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

afterAll(async ()=>{
  await db.destroy()
})

describe("sets router", () => {
  test("get list of sets return 200 and json object", async () => {
    const res = await request(server)
      .get("/api/exercises/1/sets")
      .set({ Authorization: token })
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
  })

  test("get list of sets return 2 items", async () => {
    const res = await request(server)
      .get("/api/exercises/2/sets")
      .set({ Authorization: token })
    expect(res.body.length).toBe(2)
  })

  test("add a set returns 201 and json object", async () => {
    const res = await request(server)
      .post("/api/exercises/2/sets")
      .send({ reps: 10, weight: 100 })
      .set({ Authorization: token })
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
  })

  test("add a set returns reps", async () => {
    const res = await request(server)
      .post("/api/exercises/2/sets")
      .send({ reps: 10, weight: 100 })
      .set({ Authorization: token })
    expect(res.body.reps).toBe(10)
  })

  test("delete set", async () => {
    const res = await request(server)
      .delete("/api/exercises/2/sets/1")
      .set({ Authorization: token })
    expect(res.status).toBe(204)
  })

  test("delete set", async () => {
    const res = await request(server)
      .delete("/api/exercises/1/sets/1")
      .set({ Authorization: token })
    const sets = await db("sets").where({id: 1})
    expect(sets).toEqual([])
  })
})
