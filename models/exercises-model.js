const db = require("../data/dbConfig")

const find = () => {
  return db("exercises")
}

const findBy = (filter) => {
  return db("exercises")
    .where(filter)
    .first()
}

const findById = (id) => {
  return db("exercises")
    .where({ id })
    .first()
}

const add = async (exercise) => {
  const [id] = await db("exercises").insert(exercise)
  return findById(id)
}

const update = async (exercise, id) => {
  await db("exercises").where({id}).update(exercise)
  return findById(id)
}

module.exports = { find, findBy, findById, add, update }
