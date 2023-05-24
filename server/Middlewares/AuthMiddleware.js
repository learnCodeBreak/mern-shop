const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });

module.exports.userVerification = (req, res) => {
    console.log(req.cookies)
    console.log(req.signedCookies)
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    console.log(token)
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
}