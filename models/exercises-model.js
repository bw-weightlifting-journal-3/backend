const db = require("../data/dbConfig")

const find = (user_id) => {
  return db("exercises").where("user_id", user_id)
}

const findBy = (filter) => {
  return db("exercises")
    .where(filter)
    .first()
}

const findById = async (id, user_id) => {
  const exercise = await db("exercises")
    .where({ id })
    .first()

  if (exercise.user_id === user_id) {
    const sets = await db("sets")
      .where("exercise_id", exercise.id)
      .select("id", "reps", "weight")
    return { ...exercise, sets: await sets }
  } else {
    throw new Error("Unauthorized")
  }
}

const add = async (exercise, user_id) => {
  const pgReturn = process.env.NODE_ENV === "production" ? "id" : null
  exercise = { ...exercise, user_id }
  const [id] = await db("exercises").insert(exercise, pgReturn)
  console.log(id)
  return findById(id, user_id)
}

const update = async (exercise, id, user_id) => {
  if (findById(id, user_id) !== {}) {
    await db("exercises")
      .where({ id })
      .update(exercise)
    return findById(id, user_id)
  } else {
    throw new Error
  }
}

const remove = (id) => {
  return db("exercises")
    .where({ id })
    .del()
}

module.exports = { find, findBy, findById, add, update, remove }
