const db = require("../data/dbConfig")

const find = () => {
  return db("exercises")
}

const findBy = (filter) => {
  return db("exercises")
    .where(filter)
    .first()
}

const findById = async (id) => {
  const exercise = await db("exercises")
    .where({ id })
    .first()
  const sets = await db("sets")
    .where("exercise_id", exercise.id)
    .select("id", "reps", "weight")
  return {...exercise, sets}
}

const add = async (exercise) => {
  const [id] = await db("exercises").insert(exercise, "id")
  return findById(id)
}

const update = async (exercise, id) => {
  await db("exercises")
    .where({ id })
    .update(exercise)
  return findById(id)
}

const remove = (id) => {
  return db("exercises")
    .where({ id })
    .del()
}

module.exports = { find, findBy, findById, add, update, remove }
