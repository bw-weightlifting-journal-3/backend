const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const authRouter = require("./routes/auth-router")
const authenticate = require("./middleware/auth-middleware")
const usersRouter = require("./routes/users-router")
const exercisesRouter = require("./routes/exercises-router")
const regionsRouter = require("./routes/regions-router")
const setsRouter = require("./routes/sets-router")

const server = express()
const port = process.env.PORT || 4000

const logger = () => (req, res, next) => {
  console.log(
    `[${new Date().toISOString()}]: ${req.method} - ${req.url} `,
    req.params ? req.params : null` - ${req.ip} \n`,
    req.body
  )
  next()
}

server.use(cors())
server.use(express.json())
server.use(logger())

server.use("/api/", authRouter)
server.use("/api/", authenticate, usersRouter)
server.use("/api/exercises", authenticate, exercisesRouter)
server.use("/api/exercises/:id/sets", authenticate, setsRouter)
server.use("/api/regions", authenticate, regionsRouter)

server.get("/", (req, res) => {
  res.json({ message: "WeightLifting API" })
})

server.use((err, req, res, next) => {
  console.log(err)
  if (err.message){ res.status(500).json({message: err.message})}
  res.status(500).json({ message: err })
})

if (!module.parent) {
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}

module.exports = server
