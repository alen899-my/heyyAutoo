const express = require("express");
const driverController = require("../controllers/driverController");
const auth = require("../middleware/auth");

const driverRouter = express.Router();

driverRouter.get("/getalldrivers", driverController.getalldrivers);

driverRouter.get("/getnotdrivers", auth, driverController.getnotdrivers);

driverRouter.get("/getdriversbyplace", driverController.getDriversByPlace);


driverRouter.post("/applyfordriver", auth, driverController.applyfordriver);

driverRouter.put("/deletedriver", auth, driverController.deletedriver);

driverRouter.put("/acceptdriver", auth, driverController.acceptdriver);

driverRouter.put("/rejectdriver", auth, driverController.rejectdriver);

module.exports = driverRouter;