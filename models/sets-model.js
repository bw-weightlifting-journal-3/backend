const db = require("../data/dbConfig")

const find = () => {
  return db("sets")
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

const add = async (set) => {
  const [id] = await db("sets").insert(set, "id")
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
