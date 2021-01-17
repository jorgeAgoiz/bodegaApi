// Import the validator
const { validationResult } = require("express-validator");

// Import the model
const Cerveceria = require("../models/cerveceria");

exports.insertCerve = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ message: errors });
  }

  const {
    name,
    direction,
    city,
    openingHours,
    closingTime,
    closingDay,
    comments,
  } = req.body;
  const tanks = [...req.body.tanks];

  const cerve = new Cerveceria({
    name: name,
    direction: direction,
    city: city,
    openingHours: openingHours,
    closingTime: closingTime,
    closingDay: closingDay,
    tanks: tanks,
    comments: comments,
  });

  try {
    const result = await cerve.save();
    res.status(200).json({ message: "Saved!!", result });
  } catch (err) {
    res.status(500).json({ message: "Error, not saved.", error: err });
  }
};

exports.getCerve = async (req, res, next) => {
  const { city, type } = req.query;
  console.log(city);
  console.log(type);

  try {
    const cervecerias = await Cerveceria.find();
    res.status(200).json({ message: "All results!!", result: cervecerias });
  } catch (error) {
    res.status(500).json({ message: "Error, not found.", error: err });
  }
};

/* Estudiar como implementar las diferentes peticiones con querys */

/* EXAMPLE *******

{
  "name": "Mesón A'Lareira", 
  "direction": "Calle de Porto Lagos, Calle Príncipe Don Juan Carlos, 7 Esquina, 28924 Alcorcón, Madrid",
  "city": "Alcorcon",
  "openingHours": 9,
  "closingTime": 24,
  "closingDay": "Ninguno",
  "tanks": [
      {
          "style": "Especial",
          "quantity": 4, 
          "capacity": 475,
          "position": "Verticales"
      }
  ],
  "comments": "Aparcamiento en doble fila. Unos 40 metros de manguera, intentar no ir en comidas."
} */
