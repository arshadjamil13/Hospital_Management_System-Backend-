const mongoose = require('mongoose');
const OPDPatientSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    tokenNumber: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Waiting", "In-Consultation", "Completed"],
      default: "Waiting",
    },
  },
  { timestamps: true }
);

const OPDPatient = mongoose.model('OPDPatient', OPDPatientSchema);
module.exports = { OPDPatient };