// Packages
const { Router } = require("express");
const router = Router();

// Middlewares
const { verifyToken, isModerator, isAdmin } = require("../middlewares/authJwt");
const {} = require("../middlewares/verifySignup");

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
  "/insert",
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

router.get("/get", verifyToken, getAllCerves);

router.get("/get/:id", verifyToken, getCerve);

router.put("/updateById/:id", [verifyToken, isModerator], updateCerve);

router.delete("/deleteById/:id", [verifyToken, isAdmin], deleteCerve);

module.exports = router;

/* Terminar de implementar los ROLES para las rutas */
