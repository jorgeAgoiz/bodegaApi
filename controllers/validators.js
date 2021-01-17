const { check, body } = require("express-validator");
const Cerveceria = require("../models/cerveceria");

module.exports = {
  validName: body("name")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Introduzca un nombre válido.")
    .custom((value) => {
      return Cerveceria.findOne({ name: value }).then((result) => {
        if (result) {
          return Promise.reject(
            "Esta cervecería ya existe, el nombre esta en uso."
          );
        }
      });
    }),
  validDirection: body("direction")
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage("Introduzca una dirección válida."),
  validCity: body("city")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("Introduzca una ciudad válida"),
  validHours: body("openingHours")
    .isInt({ min: 0, max: 24 })
    .withMessage("Introduzca una hora válida."),
  validTime: body("closingTime")
    .isInt({ min: 0, max: 24 })
    .withMessage("Introduzca una hora válida."),
  validDay: body("closingDay")
    .trim()
    .toLowerCase()
    .isIn([
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sabado",
      "domingo",
      "ninguno",
    ])
    .withMessage("Introduzca un dia válido."),
  validTankStyle: body("tanks.*.style")
    .trim()
    .toLowerCase()
    .isIn(["especial", "1906"])
    .withMessage("Introduzca un tipo de cerveza válido."),
  validTankCapacity: body("tanks.*.capacity")
    .isIn([235, 475, 950])
    .withMessage("Introduzca una capacidad válida."),
  validTankPosition: body("tanks.*.position")
    .trim()
    .toLowerCase()
    .isIn(["horizontales", "verticales"])
    .withMessage("Introduzca una posición válida."),
  validTankQuantity: body("tanks.*.quantity")
    .isInt({ min: 2, max: 10 })
    .withMessage("Introduzca una cantidad válida."),
  validComments: body("comments")
    .trim()
    .isLength({ max: 600 })
    .withMessage("Comentario demasiado largo."),
};
