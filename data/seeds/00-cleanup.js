
exports.seed = async (knex) => {
  await knex('sets').truncate()
  await knex('exercises').truncate()
  await knex('users').truncate()
  await knex('regions').truncate()
};
