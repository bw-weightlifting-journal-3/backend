exports.seed = async (knex) => {
  if (process.env.NODE_ENV == "production") {
    await knex.raw("truncate users, regions, exercises, sets restart identity cascade")
  } else {
    await knex("sets").truncate()
    await knex("exercises").truncate()
    await knex("regions").truncate()
    await knex("users").truncate()
  }
}
