
exports.seed = async (knex) => {
  await knex('sets').truncate()
  await knex('regions').truncate()
  await knex('exercises').truncate()
  await knex('users').truncate()
};
