// Packages
const { Router } = require("express");
const router = Router();

// Import controllers
const { signUp } = require("../controllers/auth");

// POST => "api/auth/signup"
router.post("/signup", signUp);

module.exports = router;