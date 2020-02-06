const bcrypt = require("bcryptjs")
const hash = async (password) => await bcrypt.hash(password, 12)
const db = require("../../data/dbConfig")
const usersModel = require("../users-model")

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async() => {
  await db.destroy()
})

describe("users model", () => {
  test("find", async () => {
    const res = await usersModel.find()
    expect(res.length).toBeGreaterThan(0)
  })
  test("findBy", async () => {
    const res = await usersModel.findBy({ name: "Me" })
    expect(res.name).toBe("Me")
  })
  test("findById", async () => {
    const res = await usersModel.findById(1)
    expect(res.name).toBe("Me")
  })
  test("add", async () => {
    const res = await usersModel.add({ email: "me5@me.com", name: "Me", password: `${await hash("password2")}` })
    expect(res.name).toBe("Me")
  })
  test("update", async () => {
    const res = await usersModel.update({ email: "me5@me.com", name: "Me", password: `${await hash("password2")}`, goal: "Hello!" }, 1)
    expect(res.goal).toBe("Hello!")
  })
  test("remove", async () => {
    const before = await usersModel.find(1)
    await usersModel.remove(1)
    const after = await usersModel.find(1)
    expect(after.length).toBe(before.length - 1)
  })
})
