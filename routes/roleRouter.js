const express = require("express");
const bodyParser = require("body-parser");
const Roles = require("../models/isRole");

const roleRouter = express.Router();

roleRouter.use(bodyParser.json());
roleRouter
  .route("/")
  .get((req, res, next) => {
    Roles.find({})
      .then(
        (role) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(role);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Roles.create(req.body)
      .then(
        (role) => {
          console.log("Role Created ", role);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(role);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
  })
  .delete((req, res, next) => {
    Roles.remove({})
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

module.exports = roleRouter;
