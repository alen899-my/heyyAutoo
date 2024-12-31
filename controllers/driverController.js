const Driver = require("../models/driverModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Booking = require("../models/bookingModel");

const getalldrivers = async (req, res) => {
  try {
    const query = { isDriver: true };
    if (req.locals) {
      query._id = { $ne: req.locals };
    }
    const docs = await Driver.find(query).populate("userId");
    return res.send(docs);
  } catch (error) {
    res.status(500).send("Unable to get drivers");
  }
};

const getnotdrivers = async (req, res) => {
  try {
    const query = { isDriver: false, _id: { $ne: req.locals } };
    const docs = await Driver.find(query).populate("userId");
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

    const driver = new Driver({ ...req.body.formDetails, userId: req.locals });
    await driver.save();
    return res.status(201).send("Application submitted successfully");
  } catch (error) {
    res.status(500).send("Unable to submit application");
  }
};

const acceptdriver = async (req, res) => {
  try {
    const [user, driver, notification] = await Promise.all([
      User.findOneAndUpdate(
        { _id: req.body.id },
        { isDriver: true, status: "accepted" }
      ),
      Driver.findOneAndUpdate(
        { userId: req.body.id },
        { isDriver: true }
      ),
      new Notification({
        userId: req.body.id,
        content: `Congratulations, Your application has been accepted.`,
      }).save()
    ]);

    return res.status(201).send("Application accepted notification sent");
  } catch (error) {
    res.status(500).send("Error while sending notification");
  }
};

const rejectdriver = async (req, res) => {
  try {
    const [details, delDoc, notification] = await Promise.all([
      User.findOneAndUpdate(
        { _id: req.body.id },
        { isDriver: false, status: "rejected" }
      ),
      Driver.findOneAndDelete({ userId: req.body.id }),
      new Notification({
        userId: req.body.id,
        content: `Sorry, Your application has been rejected.`,
      }).save()
    ]);

    return res.status(201).send("Application rejection notification sent");
  } catch (error) {
    res.status(500).send("Error while rejecting application");
  }
};

const deletedriver = async (req, res) => {
  try {
    await Promise.all([
      User.findByIdAndUpdate(req.body.userId, { isDriver: false }),
      Driver.findOneAndDelete({ userId: req.body.userId }),
      Booking.findOneAndDelete({ userId: req.body.userId })
    ]);
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
    const drivers = await Driver.find({
      $or: [
        { place: { $regex: new RegExp(`^${from}`, "i") } },
        { place: { $regex: new RegExp(`^${to}`, "i") } },
      ],
    }).populate("userId");

    if (!drivers.length) {
      return res.status(404).send("No drivers found for the specified place.");
    }

    res.status(200).send(drivers);
  } catch (error) {
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