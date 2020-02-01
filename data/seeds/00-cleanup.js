
exports.seed = async (knex) => {
  await knex.raw('truncate users, regions, exercises, sets restart identity cascade')

};
