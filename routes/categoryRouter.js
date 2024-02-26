const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const Category = require("../models/category");
const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

categoryRouter
  .route("/")
  .get(passport.authenticate('jwt', { session: false }),(req, res, next) => {
    Category.find({})
      .then(
        (category) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(category);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Category.create(req.body)
      .then(
        (category) => {
          console.log("category Created ", category);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(category);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /category");
  })
  .delete((req, res, next) => {
    Category.deleteMany({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

categoryRouter
  .route("/:categoryId")
  .get((req, res, next) => {
    Category.findById(req.params.categoryId)
      .then(
        (category) => {
          res.statusCode = 200; 
          res.setHeader("Content-Type", "application/json");
          res.json(category);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /category/" + req.params.categoryId
    );
  })
  .put((req, res, next) => {
    Category.findByIdAndUpdate(
      req.params.categoryId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (category) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(category);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Category.findByIdAndDelete(req.params.categoryId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = categoryRouter;
