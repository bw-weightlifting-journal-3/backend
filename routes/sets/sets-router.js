 
const express = require("express")
const setsModel = require("./sets-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const items = await setsModel.find()
    res.json(items)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const item = await setsModel.add(req.body)
    res.status(201).json(item)
  } catch (err) {
    next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const item = await setsModel.findById(req.params.id)
    await setsModel.remove(req.params.id)
    res.status(204).json({message: `${item.name} has been deleted`})
  } catch (err) {
    next(err)
  }
})

module.exports = router
