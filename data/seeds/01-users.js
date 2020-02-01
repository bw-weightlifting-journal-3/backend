const bcrypt = require("bcryptjs")
const hash = async (password) => await bcrypt.hash(password, 12)

exports.seed = async (knex) => {
  await knex('users').insert(
    [
      {
        email: "me@me.com",
        name: "Me",
        password: `${await hash('password')}`
      },
      {
        email: "me2@me.com",
        name: "Me 2",
        password: `${await hash('password1')}` 
      },
      {
        email: "me3@me.com",
        name: "Me 3",
        password: `${await hash('password2')}` 
      },
      {
        email: "me4@me.com",
        name: "Me 4",
        password: `${await hash('password3')}`
      }
    ]
  )
};
