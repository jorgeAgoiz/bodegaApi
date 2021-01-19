// Packages
const { Router } = require("express");
const router = Router();

// Import controllers
const { signUp, signIn } = require("../controllers/auth");

// POST => "api/auth/signup"
router.post("/signup", signUp);

// POST => "api/auth/signin"
router.post("/signin", signIn)

module.exports = router;

// MUST IMPLEMENT VALIDATORS TO USER MODEL ************************************