 const express = require("express")
const exercisesModel = require("../models/exercises-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const exercises = await exercisesModel.find(req.user.id)
    res.json(exercises)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const exercises = await exercisesModel.findById(req.params.id, req.user.id)
    res.json(exercises)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const exercise = await exercisesModel.add(req.body, req.user.id)
    res.status(201).json(exercise)
  } catch (err) {
    next(err)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const exercise = await exercisesModel.update(req.body, req.params.id, req.user.id)
    res.json(exercise)
  } catch (err) {
    next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const exercise = await exercisesModel.findById(req.params.id)
    await exercisesModel.remove(req.params.id)
    res.status(204).json({message: `${exercise.name} has been deleted`})
  } catch (err) {
    next(err)
  }
})

module.exports = router
