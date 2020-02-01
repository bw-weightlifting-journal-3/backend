
exports.seed = async (knex) => {
  await knex.raw('SET foreign_key_checks = 0');
  await knex('sets').truncate()
  await knex('exercises').truncate()
  await knex('regions').truncate()
  await knex('users').truncate()
  await knex.raw('SET foreign_key_checks = 1');

};
