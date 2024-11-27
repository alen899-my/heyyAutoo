const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    LicenseNumber: {
      type: String,
      required: true,
    },
    VehicleNUmber: {
      type: String,
      required: true,
    },
    Charge: {
      type: Number,
      required: true,
    },
    place:{
      type: String,
      required: true,
    },
    isDriver: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  }
);

const Driver = mongoose.model("Driver", schema);

module.exports = Driver;
