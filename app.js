/*------<INTIATE APP>------*/
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan")
/*------<MIDDLEWARE APP>------*/
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
/*------<STATIC FILES APP>------*/
app.use(express.static(path.join(__dirname, "/public")));
/*------<ROUTER APP>------*/
const authRoute = require("./routes/authRoutes");
app.use("/", authRoute);
const userRoute = require("./routes/userRoutes");
app.use("/user", userRoute);
const prodRoute = require("./routes/productRoutes");
app.use("/prod", prodRoute);
/*------<MIDDLEWARE APP>------*/
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});
app.all("*", (req, res, next) => {
  const err = new Error(`Not found ${req.originalUrl} page | 404 ⛔`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});
/*------<EXPORT APP>------*/
module.exports = app;
