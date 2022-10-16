const express = require("express");
const router = express.Router();

const authRoute = require("./authRoutes");
router.use("/", authRoute);
const userRoute = require("./userRoutes");
router.use("/user", userRoute);
const walletRoute = require("./walletRoutes");
router.use("/wallet", walletRoute);
const prodRouter = require("./../routes/productRoutes")
router.use("/prod",prodRouter)
const reqRouter = require("./../routes/requestRoutes")
router.use("/req",reqRouter)

module.exports = router;
