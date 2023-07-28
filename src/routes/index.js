const express = require("express");
const router = express.Router();
const userRouter = require("../modules/users/route")
const tripRouter = require("../modules/trips/route")


router.use("/user", userRouter);
router.use("/trip", tripRouter);


module.exports = router;
