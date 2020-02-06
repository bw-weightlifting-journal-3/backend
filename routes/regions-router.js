const express = require("express")
const regionsModel = require("../models/regions-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const regions = await regionsModel.find()
    res.json(regions)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const region = await regionsModel.findById(req.params.id)
    res.json(region)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const item = await regionsModel.add(req.body)
    res.status(201).json(item)
  } catch (err) {
    next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const region = await regionsModel.findById(req.params.id)
    await regionsModel.remove(req.params.id)
    res.status(204).json({message: `${region.name} has been deleted`})
  } catch (err) {
    next(err)
  }
})

module.exports = router
