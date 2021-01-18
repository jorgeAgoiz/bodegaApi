// Packages
const { Router } = require("express");
const router = Router();

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
const { insertCerve, getCerve, updateCerve, deleteCerve, getAllCerves } = require("../controllers/cerves");

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
  ],
  insertCerve
);

router.get("/get", getAllCerves);

router.get("/get/:id", getCerve);

router.put("/updateById/:id", updateCerve);

router.delete("/deleteById/:id", deleteCerve);

module.exports = router;
