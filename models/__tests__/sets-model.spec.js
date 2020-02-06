const db = require("../../data/dbConfig")
const setsModel = require("../sets-model")

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async() => {
  await db.destroy()
})

describe("sets model", () => {
  test("find", async () => {
    const res = await setsModel.find(1)
    expect(res.length).toBeGreaterThan(0)
  })
  test("findBy", async () => {
    const res = await setsModel.findBy({ id: 1 })
    expect(res.weight).toBe(100)
  })
  test("findById", async () => {
    const res = await setsModel.findById(1)
    expect(res.reps).toBe(10)
  })
  test("add", async () => {
    const res = await setsModel.add({ reps: "10", weight: "100", exercise_id: "1" },1)
    expect(res.weight).toBe(100)
  })
  test("remove", async () => {
    const before = await setsModel.find(1)
    await setsModel.remove(1)
    const after = await setsModel.find(1)
    expect(after.length).toBe(before.length - 1)
  })
})
