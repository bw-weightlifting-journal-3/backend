const express = require("express")
const setsModel = require("../models/sets-model")

const router = express.Router({ mergeParams: true })

router.get("/", async (req, res, next) => {
  try {
    const sets = await setsModel.find(req.params.id)
    res.json(sets)
  } catch (err) {
    next(err)
  }
})

router.get("/:set_id", async (req, res, next) => {
  try {
    const set = await setsModel.findById(req.params.set_id)
    res.json(set)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const newSet = { reps: parseInt(req.body.reps), weight: parseInt(req.body.weight) }
    const set = await setsModel.add(newSet, req.params.id)
    res.status(201).json(set)
  } catch (err) {
    next(err)
  }
})

router.put("/:set_id", async (req, res, next) => {
  try {
    const set = await setsModel.update(req.body, req.params.set_id)
    res.status(201).json(set)
  } catch (err) {
    next(err)
  }
})

router.delete("/:set_id", async (req, res, next) => {
  try {
    const set = await setsModel.findById(req.params.set_id, req.params.id)
    await setsModel.remove(req.params.set_id)
    res.status(204).json({ message: `set has been deleted` })
  } catch (err) {
    next(err)
  }
})

module.exports = router
