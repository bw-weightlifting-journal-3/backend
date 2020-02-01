 const express = require("express")
const exercisesModel = require("../models/exercises-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const items = await exercisesModel.find()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const items = await exercisesModel.findById(req.params.id)
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const item = await exercisesModel.add(req.body)
    res.status(201).json(item)
  } catch (err) {
    next(err)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const exercise = await exercisesModel.update(req.body, req.params.id)
    res.json(exercise)
  } catch (err) {
    next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const item = await exercisesModel.findById(req.params.id)
    await exercisesModel.remove(req.params.id)
    res.status(204).json({message: `${item.name} has been deleted`})
  } catch (err) {
    next(err)
  }
})

module.exports = router
