exports.seed = async (knex) => {
  await knex("exercises").insert([
    {
      name: "Deadlift",
      timestamp: "1580533720",
      region_id: "4",
      user_id: "1"
    },
    {
      name: "Bench press",
      timestamp: "1580533721",
      region_id: "1",
      user_id: "1"
    },
    {
      name: "Deadlift",
      timestamp: "1580533722",
      region_id: "4",
      user_id: "2"
    },
    {
      name: "Bench press",
      timestamp: "1580533723",
      region_id: "1",
      user_id: "2"
    },
    {
      name: "Deadlift",
      timestamp: "1580533724",
      region_id: "4",
      user_id: "3"
    },
    {
      name: "Bench press",
      timestamp: "1580533725",
      region_id: "1",
      user_id: "3"
    }
  ])
}
