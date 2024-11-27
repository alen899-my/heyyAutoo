const express = require("express");
const auth = require("../middleware/auth");
const bookingController = require("../controllers/bookingController");

const appointRouter = express.Router();

appointRouter.get(
  "/getallbookings",
  auth,
  bookingController.getallbookings
);

appointRouter.post(
  "/bookbooking",
  auth,
  bookingController.bookbooking
);

appointRouter.put("/completed", auth, bookingController.completed);

module.exports = appointRouter;
