const mongoose = require('mongoose');
const AdmittedPatientSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    bedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bed",
      required: true,
    },

    admitDate: {
      type: Date,
      default: Date.now,
    },

    dischargeDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["Admitted", "Discharged"],
      default: "Admitted",
    },
  },
  { timestamps: true }
);
const AdmittedPatient = mongoose.model('AdmittedPatient', AdmittedPatientSchema);
module.exports = { AdmittedPatient };