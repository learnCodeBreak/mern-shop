const jwt = require("jsonwebtoken");
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, './.env') });

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 60*60,
  });
};