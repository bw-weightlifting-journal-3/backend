const db = require("../data/dbConfig")

const find = (id) => {
  return db("sets").where("exercise_id", id)
}

const findBy = (filter) => {
  return db("sets")
    .where(filter)
    .first()
}

const findById = (id) => {
  return db("sets")
    .where({ id })
    .first()
}

const add = async (set, exercise_id) => {
  set = { ...set, exercise_id}
  const [id] = await db("sets").insert(set, process.env.NODE_ENV === "production"? "id": null)
  return findById(id)
}

const update = async (set, id) => {
  await db("sets").where({id}).update(set)
  return findById(id)
}
const remove = (id) => {
  return db("sets")
    .where({ id })
    .del()
}

module.exports = { find, findBy, findById, add, update, remove }
