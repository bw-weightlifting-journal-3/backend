exports.seed = async (knex) => {
  await knex("sets").insert([
    {
      reps: "10",
      weight: "100",
      exercise_id: "1"
    },
    {
      reps: "10",
      weight: "100",
      exercise_id: "1"
    },
    {
      reps: "10",
      weight: "100",
      exercise_id: "2"
    },
    {
      reps: "10",
      weight: "100",
      exercise_id: "2"
    },
    {
      reps: "10",
      weight: "100",
      exercise_id: "3"
    },
    {
      reps: "10",
      weight: "100",
      exercise_id: "3"
    },
    {
      reps: "10",
      weight: "100",
      exercise_id: "4"
    },
    {
      reps: "10",
      weight: "100",
      exercise_id: "4"
    },
    {
      reps: "10",
      weight: "100",
      exercise_id: "5"
    },
    {
      reps: "10",
      weight: "100",
      exercise_id: "5"
    },
    {
      reps: "10",
      weight: "100",
      exercise_id: "6"
    },
    {
      reps: "10",
      weight: "100",
      exercise_id: "6"
    }
  ])
}
