const db = require("../../data/dbConfig")
const regionsModel = require("../regions-model")

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async() => {
  await db.destroy()
})

describe("regions model", () => {
    test("find", async () => {
      const res = await regionsModel.find()
      expect(res.length).toBeGreaterThan(0)
    })
    test("findBy", async () => {
      const res = await regionsModel.findBy({id:1})
      expect(res.name).toBe("Upper Body")
    })
    test("findById", async () => {
      const res = await regionsModel.findById(1)
      expect(res.name).toBe("Upper Body")
    })
    test("add", async () => {
      const res = await regionsModel.add({   name: "Neck", description: "Neck muscles"})
      expect(res.name).toBe("Neck")
    })
    test("remove", async () => {
      const before = await regionsModel.find(1)
      await regionsModel.remove(1)
      const after = await regionsModel.find(1)
      expect(after.length).toBe(before.length - 1)
    })
})