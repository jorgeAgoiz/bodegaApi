const { Router } = require("express");
const router = Router();

// Import the controllers
const { insertCerve } = require("../controllers/cerves");

// GET => "api/cerveceria/insert"
router.post("/insert", insertCerve);

module.exports = router;
