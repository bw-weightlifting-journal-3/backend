# API reference

Deployed on Heroku: https://bw-weightlifting-journal.herokuapp.com/

## Auth

| Endpoint      | Method | Body                       | Description             |
| ------------- | ------ | -------------------------- | ----------------------- |
| /auth/register | POST   | { email, name , password } | Sign up a new user      |
| /auth/login    | POST   | { email , password }       | Log in an existing user |

## Regions

| Endpoint         | Method | Body | Description                                        |
| ---------------- | ------ | ---- | -------------------------------------------------- |
| /api/regions     | GET    | N/A  | Returns a list of available exercise focus regions |
| /api/regions/:id | GET    | N/A  | Returns a specific focus region by `:id`           |

## Users

| Endpoint   | Method | Body           | Description                                                               |
| ---------- | ------ | -------------- | ------------------------------------------------------------------------- |
| /api/user  | GET    |                | Returns a single user (based on JWT), includes nested exercises and sets. |
| /api/users | GET    | { page_number } | If user is an admin, it will return all users (10 users per page)         |

## Exercises

| Endpoint           | Method | Body                      | Description                                                |
| ------------------ | ------ | ------------------------- | ---------------------------------------------------------- |
| /api/exercises     | GET    |                           | Returns list of exercises with nested sets (based on JWT). |
| /api/exercises     | POST   | { name, date, region_id } | Adds a new exercise to user (based on JWT)                 |
| /api/exercises/:id | PUT    | { name, date, region_id } | Update an existing exercise by `:id`                       |
| /api/exercises/:id | DELETE |                           | Delete an exercise by `:id`                                |

## Sets

| Endpoint                         | Method | Body             | Description                             |
| -------------------------------- | ------ | ---------------- | --------------------------------------- |
| /api/exercises/:exercise_id/sets | GET    |                  | Returns list of sets for `:exercise_id` |
| /api/exercises/:exercise_id/sets | POST   | { reps, weight } | Add new set to `:exercise_id`           |
| /api/sets/:set_id                | PUT    | { reps, weight } | Update existing set by `:set_id`        |
| /api/sets/:set_id                | DELETE |                  | Delete a set by `:set_id`               |
