const bcrypt = require("bcryptjs")
const db = require("../data/dbConfig")
const exercisesModel = require("./exercises-model")

const find = (user) => {
  if (user.admin) {
  return db("users").select("id", "email", "name")
  }
  return []
}

const findBy = (filter) => {
  return db("users")
    .where(filter)
    .select(["id", "email", "name","password", "avatar_url", "goal"])
    .first()
}

const findById = async (id) => {
  const user = await db("users")
    .where({ id })
    .first("id", "email", "name")
  const exercises = await db("exercises")
    .where("user_id", id)
    .select("id")
  const withSets = Promise.all(
    exercises.map(async (exercise) => {
      const exerciseWithSets = await exercisesModel.findById(exercise.id)
      return await exerciseWithSets
    })
  )
  return { ...user, exercises: await withSets }
}

const add = async ({ email, name, password, admin }) => {
  password = await bcrypt.hash(password, 12)
  const [id] = await db("users").insert({ email, name, password, admin }, process.env.NODE_ENV === "production"? "id": null)
  return findById(id)
}

const update = async (user, id) => {
  await db("users")
    .where({ id })
    .update(user)
  return findBy({id})
}

const remove = (id) => {
  return db("users")
    .where({ id })
    .del()
}

module.exports = { find, findBy, findById, add, update, remove }
