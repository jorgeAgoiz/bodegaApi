const mongoose = require("mongoose");
mongoose.pluralize(null);
const Schema = mongoose.Schema;

const cerveSchema = new Schema(
  {
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
    telephone: {
      type: String,
      required: false,
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
        style: {
          type: String,
          required: true,
        },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cerveceria", cerveSchema);
