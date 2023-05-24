const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const authRoute = require("./Routes/AuthRoute");
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, './.env') });

const app = express();
// const PORT = 4000;
// require("dotenv").config();
const { MONGO_URL, PORT} = process.env;
// console.log(MONGO_URL)

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

  
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:4000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );


  app.use(cookieParser());

  app.use(express.json());
  
  app.use("/", authRoute);
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });