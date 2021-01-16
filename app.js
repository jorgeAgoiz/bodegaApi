// Set the environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// environment variables
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Middlewares
app.use(bodyParser.json());

// Server && DB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Listening in port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
