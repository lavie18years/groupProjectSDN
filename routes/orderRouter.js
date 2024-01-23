const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Order = require("../models/product");
const orderRouter = express.Router();
orderRouter.use(bodyParser.json());

orderRouter
  .route("/")
  .get((req, res, next) => {
    Order.find({})
      .then(
        (Product) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(Product);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Order.create(req.body)
      .then(
        (product) => {
          console.log("Order Created ", product);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(product);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /Order");
  })
  .delete((req, res, next) => {
    Order.deleteMany({})
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

  module.exports = orderRouter;