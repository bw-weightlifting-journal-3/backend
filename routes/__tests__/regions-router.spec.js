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

describe("regions router", () => {
  test("get list of regions return 200 and json object", async () => {
    const res = await request(server)
      .get("/api/regions")
      .set({ Authorization: token })
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
  })

  test("get list of regions return 4 items", async () => {
    const res = await request(server)
      .get("/api/regions")
      .set({ Authorization: token })
    expect(res.body.length).toBe(4)
  })

  test("add a region returns 201 and json object", async () => {
    const res = await request(server)
      .post("/api/regions")
      .send({ name: "Abs", description: "Abdomenal Muscles" })
      .set({ Authorization: token })
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
  })

  test("add a region returns name", async () => {
    const res = await request(server)
      .post("/api/regions")
      .send({ name: "Abs", description: "Abdomenal Muscles" })
      .set({ Authorization: token })
    expect(res.body.name).toBe("Abs")
  })

  test("delete region", async () => {
    const res = await request(server)
      .delete("/api/regions/1")
      .set({ Authorization: token })
    expect(res.status).toBe(204)
  })

  test("delete region", async () => {
    const res = await request(server)
      .delete("/api/regions/1")
      .set({ Authorization: token })
    const regions = await db("regions")
    expect(regions.length).toBe(3)
  })
})
