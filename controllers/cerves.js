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
    return res.status(200).json({ message: "Saved!!", result });
  } catch (err) {
    return res.status(500).json({ message: "Error, not saved.", error: err });
  }
};

exports.getAllCerves = async (req, res, next) => {
  try {
    const cervecerias = await Cerveceria.find();
    return res
      .status(200)
      .json({ message: "All results!!", result: cervecerias });
  } catch (error) {
    return res.status(500).json({ message: "Error, not found.", error: err });
  }
};

exports.getCerve = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cerveceria = await Cerveceria.findById(id);
    return res
      .status(200)
      .json({ message: "Your result.", result: cerveceria });
  } catch (err) {
    return res.status(500).json({ message: "Error, not found.", error: err });
  }
};

exports.updateCerve = async (req, res, next) => {
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

/* Esta ruta no funciona ahora mismo ***************************************** */
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

/* Estudiar como implementar las diferentes peticiones con querys */
