const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["Admin", "Doctor", "Staff"],
      default: "Admin",
    }
  },
  { timestamps: true }
);
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = { Admin };