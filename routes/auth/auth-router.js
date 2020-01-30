const bcrypt = require("bcryptjs")
const usersModel = require("../users/users-model")
const router = require("express").Router()
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET || "this is my secret passphrase"

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body
    const newUser =
      username && password
        ? await usersModel.add({ username, password })
        : res.status(500).json({ message: "Missing username and/or password" })
    res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
})

router.post("/login", async (req, res, next) => {
  const generateToken = (user) => {
    const payload = {
      subject: user.id,
      username: user.username
    }
    const options = {
      expiresIn: "1d"
    }
    return jwt.sign(payload, jwtSecret, options)
  }

  try {
    const { username, password } = req.body
    const user = await usersModel.findBy({ username })
    const validated = await bcrypt.compare(password, user.password)
    if (user && validated) {
      const token = generateToken(user)
      res.status(200).json({ message: `Hi ${user.username}. Here's your token.`, token })
    } else {
      res.status(401).json({ message: `Invalid credentials` })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router