const db = require("../../data/dbConfig")
const exercisesModel = require("../exercises-model")

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async() => {
  await db.destroy()
})

describe("exercises model", () => {
  test("find", async () => {
    const res = await exercisesModel.find(1)
    expect(res.length).toBeGreaterThan(0)
  })
  test("findBy", async () => {
    const res = await exercisesModel.findBy({ user_id: 1 })
    expect(res.name).toBe("Deadlift")
  })
  test("findById", async () => {
    const res = await exercisesModel.findById(1)
    expect(res.name).toBe("Deadlift")
  })
  test("add", async () => {
    const res = await exercisesModel.add({
      name: "Lat pulldowns",
      timestamp: "1580533721",
      region_id: "1",
      user_id: "1"
    },1)
    expect(res.name).toBe("Lat pulldowns")
  })
  test("remove", async () => {
    const before = await exercisesModel.find(1)
    await exercisesModel.remove(1)
    const after = await exercisesModel.find(1)
    expect(after.length).toBe(before.length - 1)
  })
})
