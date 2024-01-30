const express = require("express");
const bodyParser = require("body-parser");
const Roles = require("../models/isRole")

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
    Roles.deleteMany({})
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

  roleRouter
  .route("/:roleId")
  .get((req, res, next) => {
    Roles.findById(req.params.roleId)
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
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /category/" + req.params.categoryId
    );
  })
  .put((req, res, next) => {
    Roles.findByIdAndUpdate(
      req.params.roleId,
      {
        $set: req.body,
      },
      { new: true }
    )
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
  .delete((req, res, next) => {
    Roles.findByIdAndDelete(req.params.roleId)
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