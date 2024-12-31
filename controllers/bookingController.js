const Booking = require("../models/bookingModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");

const getallbookings = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [{ userId: req.query.search }, { driverId: req.query.search }],
        }
      : {};

    const bookings = await Booking.find(keyword)
      .populate("driverId")
      .populate("userId");
    return res.send(bookings);
  } catch (error) {
    res.status(500).send("Unable to get appointments");
  }
};

const bookbooking = async (req, res) => {
  try {
    const booking = new Booking({
      date: req.body.date,
      time: req.body.time,
      driverId: req.body.driverId,
      userId: req.locals,
    });

    const user = await User.findById(req.locals);

    const [userNotification, driverNotification, result] = await Promise.all([
      new Notification({
        userId: req.locals,
        content: `You booked a booking with Driver ${req.body.drivername} for ${req.body.date} ${req.body.time}`,
      }).save(),
      new Notification({
        userId: req.body.driverId,
        content: `You have a booking with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}`,
      }).save(),
      booking.save(),
    ]);

    return res.status(201).send(result);
  } catch (error) {
    res.status(500).send("Unable to book booking");
  }
};

const completed = async (req, res) => {
  try {
    const user = await User.findById(req.locals);

    const [alreadyFound, userNotification, driverNotification] = await Promise.all([
      Booking.findOneAndUpdate(
        { _id: req.body.appointid },
        { status: "Completed" }
      ),
      new Notification({
        userId: req.locals,
        content: `Your booking with ${req.body.drivername} has been completed`,
      }).save(),
      new Notification({
        userId: req.body.driverId,
        content: `Your booking with ${user.firstname} ${user.lastname} has been completed`,
      }).save(),
    ]);

    return res.status(201).send("Booking completed");
  } catch (error) {
    res.status(500).send("Unable to complete booking");
  }
};

module.exports = {
  getallbookings,
  bookbooking,
  completed,
};