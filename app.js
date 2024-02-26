
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require('express-session');

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const feedbackRouter = require("./routes/feedbackRouter");
var productRouter = require("./routes/productRouter");
var categoryRouter = require("./routes/categoryRouter");
let orderRouter = require("./routes/orderRouter");
const accountRouter = require("./routes/accountRouter");
const roleRouter = require("./routes/roleRouter");
var app = express();
const mongoose = require("mongoose");

const product = require("./models/product");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/orders", orderRouter);
app.use("/accounts", accountRouter);
app.use("/roles", roleRouter);
app.use("/feedback", feedbackRouter);

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
var passport = require('passport');
app.use(session({
  // name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  // store: new FileStore()
}));
app.use(passport.session());
app.use(passport.initialize());

module.exports = app;
