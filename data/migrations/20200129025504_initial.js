exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary()
    table
      .string("email")
      .notNullable()
      .unique()
    table.string("name").notNullable()
    table.string("password").notNullable()
    table.boolean("admin").defaultTo(false)
  })
  await knex.schema.createTable("regions", (table) => {
    table.increments("id").primary()
    table.string("name").notNullable()
    table.string("description")
  })
  await knex.schema.createTable("exercises", (table) => {
    table.increments("id").primary()
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
    table
      .integer("region_id")
      .notNullable()
      .references("id")
      .inTable("regions")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
    table.string("name").notNullable()
    table
      .integer("timestamp")
      .notNullable()
  })
  await knex.schema.createTable("sets", (table) => {
    table.increments("id").primary()
    table
      .integer("exercise_id")
      .notNullable()
      .references("id")
      .inTable("exercises")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
    table.integer("reps").notNullable()
    table.integer("weight").notNullable()
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("sets")
  await knex.schema.dropTableIfExists("exercises")
  await knex.schema.dropTableIfExists("regions")
  await knex.schema.dropTableIfExists("users")
}
