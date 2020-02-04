const express = require("express")
const setsModel = require("../models/sets-model")

const router = express.Router({mergeParams: true})

router.get("/", async (req, res, next) => {
  try {
    const sets = await setsModel.find()
    res.json(sets)
  } catch (err) {
    next(err)
  }
})

router.get("/:set_id", async (req, res, next) => {
  try {
    const set = await setsModel.findById(req.params.set_id, id)
    res.json(set)
  } catch (err) {
    next(err)
  }
})

router.put("/", async (req, res, next) => {
  try {
    const set = await setsModel.update(req.body)
    res.status(201).json(set)
  } catch (err) {
    next(err)
  }
})

router.delete("/:set_id", async (req, res, next) => {
  try {
    const set = await setsModel.findById(req.params.set_id, id)
    await setsModel.remove(req.params.id)
    res.status(204).json({message: `${set.name} has been deleted`})
  } catch (err) {
    next(err)
  }
})

module.exports = router
