const { Router } = require("express");
const router = Router();

router.get("/", (req, res, next) => {
  res.send("Cervecerias API");
});

module.exports = router;
