const Cerveceria = require("../models/cerveceria");

exports.insertCerve = async (req, res, next) => {
  const {
    name,
    direction,
    city,
    openingHours,
    closingTime,
    closingDay,
    comments,
  } = req.body;

  const cerve = new Cerveceria({
    name: name,
    direction: direction,
    city: city,
    openingHours: openingHours,
    closingTime: closingTime,
    closingDay: closingDay,
    tanks: [...req.body.tanks],
    comments: comments,
  });

  try {
    const result = await cerve.save();
    res.status(200).json({ message: "Saved!!", result });
  } catch (err) {
    res.status(500).json({ message: "Error, not saved.", error: err });
  }
};

/* Aplicar validaciones para los campos */
