
exports.seed = async (knex) => {
  await knex('regions').insert(
    [
      {
        name: "Upper Body",
        description: "Chest and shoulders"
      },
      {
        name: "Lower Body",
        description: "Glutes, thighs and calves"
      },
      {
        name: "Arms",
        description: "Arms"
      },
      {
        name: "Core",
        description: "Back and abdominal area"
      }
    ]
  )
};
