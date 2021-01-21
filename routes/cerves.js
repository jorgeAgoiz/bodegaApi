// Packages
const { Router } = require("express");
const router = Router();

// Middlewares
const {
  verifyToken,
  isModerator,
  isAdmin,
  isUser,
} = require("../middlewares/authJwt");

// Import validators
const {
  validName,
  validDirection,
  validCity,
  validHours,
  validTime,
  validDay,
  validTankStyle,
  validTankCapacity,
  validTankQuantity,
  validTankPosition,
  validComments,
} = require("../controllers/validators");

// Import the controllers
const {
  insertCerve,
  getCerve,
  updateCerve,
  deleteCerve,
  getAllCerves,
} = require("../controllers/cerves");

// POST => "api/cerveceria/insert"
router.post(
  "/",
  [
    validName,
    validDirection,
    validCity,
    validHours,
    validTime,
    validDay,
    validTankStyle,
    validTankCapacity,
    validTankQuantity,
    validTankPosition,
    validComments,
    verifyToken,
    isModerator,
  ],
  insertCerve
);

router.get("/", [verifyToken, isUser], getCerve);

router.put(
  "/:id",
  [
    validName,
    validDirection,
    validCity,
    validHours,
    validTime,
    validDay,
    validTankStyle,
    validTankCapacity,
    validTankQuantity,
    validTankPosition,
    validComments,
    verifyToken,
    isModerator,
  ],
  updateCerve
);

router.delete("/:id", [verifyToken, isAdmin], deleteCerve);

module.exports = router;

/* Roles para las rutas terminados 
  User => GET, GET/:ID
  Moderator => GET, GET/:ID, /PUT, /POST
  Admin => GET, GET/:ID, /PUT, /POST, DELETE
*/

/* 
POST => http://localhost:3000/api/cerveceria/
GET => http://localhost:3000/api/cerveceria/
GET => http://localhost:3000/api/cerveceria/:id
PUT => http://localhost:3000/api/cerveceria/:id
DELETE => http://localhost:3000/api/cerveceria/:id
*/
