const express = require("express");
const router = express.Router();

const authRoute = require("./authRoutes");
router.use("/", authRoute);
const userRoute = require("./userRoutes");
router.use("/user", userRoute);
const walletRoute = require("./walletRoutes");
router.use("/wallet", walletRoute);

module.exports = router;
