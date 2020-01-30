const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET || "this is my secret passphrase"

module.exports = (req, res, next) => {
  const notAllowed = { message: "Unauthorized." }
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json(notAllowed)
  }
  jwt.verify(token, jwtSecret, (err, { sub, username }) => {
    if (err) {
      res.status(401).json(notAllowed)
    } else {
      req.user = { id: sub, username }
    }
  })
  next()
}
