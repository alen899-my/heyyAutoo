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
    res.status(500).send("Unable to get apponintments");
  }
};

const bookbooking = async (req, res) => {
  try {
    const booking = await Booking({
      date: req.body.date,
      time: req.body.time,
      driverId: req.body.driverId,
      userId: req.locals,
    });

    const usernotification = Notification({
      userId: req.locals,
      content: `You booked an booking with Driver. ${req.body.drivername} for ${req.body.date} ${req.body.time}`,
    });

    await usernotification.save();

    const user = await User.findById(req.locals);

    const drivernotification = Notification({
      userId: req.body.driverId,
      content: `You have an booking with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}`,
    });

    await drivernotification.save();

    const result = await booking.save();
    return res.status(201).send(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to book booking");
  }
};

const completed = async (req, res) => {
  try {
    const alreadyFound = await Booking.findOneAndUpdate(
      { _id: req.body.appointid },
      { status: "Completed" }
    );

    const usernotification = Notification({
      userId: req.locals,
      content: `Your booking with ${req.body.drivername} has been completed`,
    });

    await usernotification.save();

    const user = await User.findById(req.locals);

    const drivernotification = Notification({
      userId: req.body.driverId,
      content: `Your booking with ${user.firstname} ${user.lastname} has been completed`,
    });

    await drivernotification.save();

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
