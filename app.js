// Set the environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// Import utils
const { setRoles } = require("./util/autoroles");

//Import Routes
const cerveRoutes = require("./routes/cerves");
const authRoutes = require("./routes/auth");

// environment variables
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cerveceria", cerveRoutes);

// Server && DB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    app.listen(PORT, () => {
      setRoles();
      console.log(`Listening in port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

  // MUST IMPLEMENT A GOOD HANDLING ERRORS AND ADJUST ALL STATUS CODES ***************************
