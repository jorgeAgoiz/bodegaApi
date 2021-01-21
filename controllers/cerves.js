// Import the validator
const { validationResult } = require("express-validator");

// Import the model
const Cerveceria = require("../models/cerveceria");

// POST => "/api/cerveceria" para crear una cerveceria.
exports.insertCerve = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors });
  }

  try {
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

    const result = await cerve.save();
    return res.status(201).json({ message: "Saved!!", result });
  } catch (err) {
    return res.status(500).json({ message: "Error, not saved.", error: err });
  }
};

// GET => "/api/cerveceria" para obtener cervecerias.
exports.getCerve = async (req, res, next) => {
  try {
    const { id, city, openHour, closingDay } = req.query;
    let query = {};
    if (city) {
      query.city = city;
    }
    if (openHour) {
      query.openingHours = openHour;
    }
    if (closingDay) {
      query.closingDay = closingDay.toLowerCase();
    }
    if (id) {
      query._id = id;
    }

    const cerveceria = await Cerveceria.find(query);
    if (!cerveceria) {
      throw new Error();
    }
    return res
      .status(200)
      .json({ message: "Your result.", result: cerveceria });
  } catch (err) {
    return res.status(500).json({ message: "Error, not found.", error: err });
  }
};

// PUT => "/api/cerveceria" para actualizar una cerveceria.
exports.updateCerve = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors });
  }
  const { id } = req.params;
  try {
    const updatedCerve = await Cerveceria.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Updated!!.", result: updatedCerve });
  } catch (err) {
    return res.status(500).json({ message: "Error, not found.", error: err });
  }
};

// DELETE => "/api/cerveceria" para eliminar una cerveceria.
exports.deleteCerve = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deletedCerve = await Cerveceria.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Deleted!!", deleted: deletedCerve });
  } catch (error) {
    return res.status(500).json({ message: "Error, not found.", error: err });
  }
};
