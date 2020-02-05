const db = require("../data/dbConfig")

const find = () => {
  return db("regions")
}

const findBy = (filter) => {
  return db("regions")
    .where(filter)
    .first()
}

const findById = (id) => {
  return db("regions")
    .where({ id })
    .first()
}

const add = async (region) => {
  const [id] = await db("regions").insert(region, process.env.NODE_ENV === "production"? "id": null)
  return findById(id)
}

const update = async (region, id) => {
  await db("regions").where({id}).update(region)
  return findById(id)
}
const remove = (id) => {
  return db("regions")
    .where({ id })
    .del()
}

module.exports = { find, findBy, findById, add, update, remove }
