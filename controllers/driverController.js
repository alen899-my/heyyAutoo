const Driver = require("../models/driverModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Booking = require("../models/bookingModel");

const getalldrivers = async (req, res) => {
  try {
    let docs;
    if (!req.locals) {
      docs = await Driver.find({ isDriver: true }).populate("userId");
    } else {
      docs = await Driver.find({ isDriver: true })
        .find({
          _id: { $ne: req.locals },
        })
        .populate("userId");
    }

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get drivers");
  }
};

const getnotdrivers = async (req, res) => {
  try {
    const docs = await Driver.find({ isDriver: false })
      .find({
        _id: { $ne: req.locals },
      })
      .populate("userId");

    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get non drivers");
  }
};

const applyfordriver = async (req, res) => {
  try {
    const alreadyFound = await Driver.findOne({ userId: req.locals });
    if (alreadyFound) {
      return res.status(400).send("Application already exists");
    }

    const driver = Driver({ ...req.body.formDetails, userId: req.locals });
    const result = await driver.save();

    return res.status(201).send("Application submitted successfully");
  } catch (error) {
    res.status(500).send("Unable to submit application");
  }
};

const acceptdriver = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDriver: true, status: "accepted" }
    );

    const driver = await Driver.findOneAndUpdate(
      { userId: req.body.id },
      { isDriver: true }
    );

    const notification = await Notification({
      userId: req.body.id,
      content: `Congratulations, Your application has been accepted.`,
    });

    await notification.save();

    return res.status(201).send("Application accepted notification sent");
  } catch (error) {
    res.status(500).send("Error while sending notification");
  }
};

const rejectdriver = async (req, res) => {
  try {
    const details = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDriver: false, status: "rejected" }
    );
    const delDoc = await Driver.findOneAndDelete({ userId: req.body.id });

    const notification = await Notification({
      userId: req.body.id,
      content: `Sorry, Your application has been rejected.`,
    });

    await notification.save();

    return res.status(201).send("Application rejection notification sent");
  } catch (error) {
    res.status(500).send("Error while rejecting application");
  }
};

const deletedriver = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.body.userId, {
      isDriver: false,
    });
    const removeDoc = await Driver.findOneAndDelete({
      userId: req.body.userId,
    });
    const removeAppoint = await Booking.findOneAndDelete({
      userId: req.body.userId,
    });
    return res.send("Driver deleted successfully");
  } catch (error) {
  
    res.status(500).send("Unable to delete driver");
  }
};
const getDriversByPlace = async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).send("Both 'from' and 'to' fields are required.");
  }

  try {
    // Adjust the filtering logic to match your Driver schema
    const drivers = await Driver.find({
      $or: [
        { place: { $regex: new RegExp(`^${from}`, "i") } }, // Match 'from' (case-insensitive, starting with the value)
        { place: { $regex: new RegExp(`^${to}`, "i") } },   // Match 'to' (case-insensitive, starting with the value)
      ], // Matches places starting with 'from' or 'to'
    }).populate("userId");

    if (!drivers.length) {
      return res.status(404).send("No drivers found for the specified place.");
    }

    res.status(200).send(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).send("Server error occurred.");
  }
};


module.exports = {
  getalldrivers,
  getnotdrivers,
  deletedriver,
  applyfordriver,
  acceptdriver,
  rejectdriver,
  getDriversByPlace,
};