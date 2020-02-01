const express = require("express")
const setsModel = require("../models/sets-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const sets = await setsModel.find()
    res.json(sets)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const set = await setsModel.findById(req.params.id)
    res.json(set)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const set = await setsModel.add(req.body)
    res.status(201).json(set)
  } catch (err) {
    next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const set = await setsModel.findById(req.params.id)
    await setsModel.remove(req.params.id)
    res.status(204).json({message: `${set.name} has been deleted`})
  } catch (err) {
    next(err)
  }
})

module.exports = router
