const mongoose = require('mongoose');
const BedSchema = new mongoose.Schema({
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    bedNumber: {
      type: String,
      required: true,
      trim: true,
    },

    wardType: {
      type: String,
      enum: ["General", "ICU"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "Occupied", "Cleaning"],
      default: "Available",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdmittedPatient", // linked only when occupied
      default: null,
    },
  },
  { timestamps: true }
);
const Bed = mongoose.model('Bed', BedSchema);
module.exports  = {Bed}