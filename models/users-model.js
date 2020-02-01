const bcrypt = require("bcryptjs")
const db = require("../data/dbConfig")
const exercisesModel = require("./exercises-model")

const find = () => {
  return db("users").select("id", "email", "name")
}

const findBy = (filter) => {
  return db("users")
    .where(filter)
    .select(["id", "email", "password"])
    .first()
}

const findById = async (id) => {
  const user = await db("users")
    .where({ id })
    .first("id", "email", "name")
  const exercises = await db("exercises")
    .where("user_id", id)
    .select("id", "name", "timestamp")
  const withSets = Promise.all(
    exercises.map(async (exercise) => {
      const sets = await exercisesModel.findById(exercise.id)
      return await { ...exercise, sets }
    })
  )
  return { ...user, exercises: await withSets }
}

const add = async ({ email, name, password, admin }) => {
  password = await bcrypt.hash(password, 12)
  const [id] = await db("users").insert({ email, name, password, admin }, "id")
  return findById(id)
}

const update = async (user, id) => {
  await db("users")
    .where({ id })
    .update(user)
  return findById(id)
}

const remove = (id) => {
  return db("users")
    .where({ id })
    .del()
}

module.exports = { find, findBy, findById, add, update, remove }
