
exports.seed = async (knex) => {
  await knex('sets').truncate()
  await knex('exercises').truncate()
  await knex('regions').truncate()
  await knex('users').truncate()
};
