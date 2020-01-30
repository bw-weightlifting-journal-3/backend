const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const authRouter = require("./routes/auth/auth-router")
const authenticate = require("./routes/auth/auth-middleware")
const usersRouter = require("./routes/users/users-router")
const exercisesRouter = require("./routes/exercises/exercises-router")
const regionsRouter = require("./routes/regions/regions-router")
const setsRouter = require("./routes/sets/sets-router")

const server = express()
const port = process.env.PORT || 4000

server.use(cors())
server.use(helmet())
server.use(express.json())

server.use("/api/", usersRouter)
server.use("/api/", authenticate, authRouter)
server.use("/api/exercises", exercisesRouter)
server.use("/api/sets", setsRouter)
server.use("/api/regions", regionsRouter)

server.get("/", (req, res) => {
  res.json({ message: "WeightLifting API" })
})

if (!module.parent) {
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}

module.exports = server
