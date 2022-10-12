const express = require("express");
const app = express();

const authRoute = require("./routes/authRoutes");
app.use("/", authRoute);
const userRoute = require("./routes/userRoutes");
app.use("/user", userRoute);
const prodRoute = require("./routes/productRoutes");
app.use("/prod", prodRoute);
const walletRoute = require("./routes/walletRoutes");
app.use("/wallet", walletRoute);
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);