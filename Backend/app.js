const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const populate = require("./utils/populateDictionary.js");
dotenv.config();

// define routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const dictionaryRoute = require("./routes/dictionary");
const favouriteRoute = require("./routes/favourite");

var app = express();

app.use(bodyParser.json({ limit: "500kb" }));

//Middlewares
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/dictionary", dictionaryRoute);
app.use("/favourite", favouriteRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
