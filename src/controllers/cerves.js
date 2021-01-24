// ******************************** Import the validator
const { validationResult } = require("express-validator");

// ******************************** Import the model
const Cerveceria = require("../models/cerveceria");

// ******************************** POST => "/api/cerveceria" para crear una cerveceria.
exports.insertCerve = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors });
  }
  try {
    let images = [];
    const {
      name,
      direction,
      city,
      telephone,
      openingHours,
      closingTime,
      closingDay,
      comments,
    } = req.body;
    const tanks = [...req.body.tanks];
    let pictures = req.files;
    for (let pic of pictures) {
      images.push(pic.path.replace(/\\/g, "/"));
    }
    console.log(images);
    // Aqui implementaremos la subida de imagenes, cuando tengamos un front end diseñado.************************************
    const cerve = new Cerveceria({
      picturesUrl: images,
      name: name,
      direction: direction,
      city: city,
      telephone: telephone,
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

// ******************************** GET => "/api/cerveceria" para obtener cervecerias.
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
      return res.status(404).json({ message: "Error, not found.", error: err });
    }
    return res
      .status(200)
      .json({ message: "Your result.", result: cerveceria });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error, something went wrong.", error: err });
  }
};

// ************************************ PUT => "/api/cerveceria" para actualizar una cerveceria.
exports.updateCerve = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors });
  }
  const { id } = req.query;
  try {
    const updatedCerve = await Cerveceria.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCerve) {
      return res.status(404).json({ message: "Error, not found.", error: err });
    }
    return res
      .status(201)
      .json({ message: "Updated!!.", result: updatedCerve });
  } catch (err) {
    return res.status(500).json({ message: "Error, not found.", error: err });
  }
};

// ************************************* DELETE => "/api/cerveceria" para eliminar una cerveceria.
exports.deleteCerve = async (req, res, next) => {
  const { id } = req.query;
  console.log(id);
  try {
    const deletedCerve = await Cerveceria.findByIdAndDelete(id);
    if (!deletedCerve) {
      return res.status(404).json({ message: "Error, not found.", error: err });
    }
    return res
      .status(200)
      .json({ message: "Deleted!!", deleted: deletedCerve });
  } catch (error) {
    return res.status(500).json({ message: "Error, not found.", error: err });
  }
};
