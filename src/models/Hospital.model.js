const mongoose = require("mongoose")

const HospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },

    departments: [
      {
        type: String,
        trim: true,
      },
    ],

    totalBeds: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Hospital = mongoose.model("Hospital", HospitalSchema);
module.exports = {Hospital}