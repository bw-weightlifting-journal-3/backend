
exports.seed = async (knex) => {
  await knex('regions').insert(
    [
      {
        name: "Upper Body",
        description: "chest, back and shoulders"
      },
      {
        name: "Lower Body",
        description: "glutes, thighs and calves"
      },
      {
        name: "Arms",
        description: "arms"
      },
      {
        name: "Core",
        description: "abdominal area"
      }
    ]
  )
};
