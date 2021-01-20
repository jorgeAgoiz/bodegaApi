// Packages
const { Router } = require("express");
const router = Router();

/* // Middlewares
const { verifyToken } = require("../middlewares/authJwt");
const { } = require("../middlewares/verifySignup"); */

// Import controllers
const { signUp, signIn } = require("../controllers/auth");

//Import validators
const { validEmail } = require("../controllers/validators");

// POST => "api/auth/signup"
router.post("/signup", validEmail, signUp);

// POST => "api/auth/signin"
router.post("/signin", signIn);

module.exports = router;
