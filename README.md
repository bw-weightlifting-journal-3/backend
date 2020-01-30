# How to run this server locally:

# API reference

## Auth

| Endpoint      | Method | Body                    | Description             |
| ------------- | ------ | ----------------------- | ----------------------- |
| /api/register | POST   | { username , password } | Sign up a new user      |
| /api/login    | POST   | { username , password } | Log in an existing user |

## Regions

| Endpoint         | Method | Body | Description                                        |
| ---------------- | ------ | ---- | -------------------------------------------------- |
| /api/regions     | GET    | N/A  | Returns a list of available exercise focus regions |
| /api/regions/:id | GET    | N/A  | Returns a specific focus region by `:id`           |

## Users

| Endpoint  | Method | Body | Description                                                       |
| --------- | ------ | ---- | ----------------------------------------------------------------- |
| /api/user | GET    |      | Returns user (based on token), includes nested exercises and sets |

## Exercises

| Endpoint       | Method | Body                      | Description                                                 |
| -------------- | ------ | ------------------------- | ----------------------------------------------------------- |
| /api/exercises | GET    |                           | Returns list of exercises with nested sets (based on token) |
| /api/exercises | POST   | { name, date, region_id } | Adds a new exercise to user (based on token)                |

## Sets

| Endpoint                         | Method | Body             | Description                             |
| -------------------------------- | ------ | ---------------- | --------------------------------------- |
| /api/exercises/:exercise_id/sets | GET    |                  | Returns list of sets for `:exercise_id` |
| /api/exercises/:exercise_id/sets | POST   | { reps, weight } | Add new set to `:exercise_id`           |
