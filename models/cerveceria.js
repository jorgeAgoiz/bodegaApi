const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cerveSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  openingHours: {
    type: Number,
    required: true,
  },
  closingTime: {
    type: Number,
    required: true,
  },
  closingDay: {
    type: String,
    required: true,
  },
  tanks: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      capacity: {
        type: Number,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
    },
  ],
  comments: {
    type: String,
    required: false,
  },
  picturesUrl: [
    {
      type: String,
      required: false,
    },
  ],
});

module.exports = mongoose.model("Cerveceria", cerveSchema);
