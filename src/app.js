// ***************************************** Set the environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// ************************************************************* Packages
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

// ********************************************************* Import utils
const { setRoles } = require("./util/autoroles");

//Import Routes
const cerveRoutes = require("./routes/cerves");
const authRoutes = require("./routes/auth");
// ************************************************* Environment variables
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// ******************************************************* Multer Options
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// ***************************************************** Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("images", 3)
);
// app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-access-token"
  );
  next();
});

// ****************************************************** Routes
app.use("/api/auth", authRoutes);
app.use("/api/cerveceria", cerveRoutes);

// ************************************************ Server && DB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) => {
    app.listen(PORT, () => {
      setRoles(); // From "./util/autoroles,js"
      console.log(`Listening in port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

/*
  *********************************************************************
  => Implementar multer para subir imagenes
  *********************************************************************
  */
