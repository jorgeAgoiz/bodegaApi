// Set the environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Packages
const express = require("express");
const app = express();

// environment variables
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());

// Server
app.listen(PORT, () => {
  console.log(`Listening in port: ${PORT}`);
});
