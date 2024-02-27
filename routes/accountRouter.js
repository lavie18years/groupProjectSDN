const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var passport = require('passport');

const Accounts = require("../models/accounts");

const accountRouter = express.Router();

accountRouter.use(bodyParser.json());

accountRouter
  .route("/")

  .get((req, res, next) => {
    // Accounts.find({})
    Accounts.find()
      // .populate("role", "name")
      .populate("role")
      .then(
        (dishes) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dishes);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    // Accounts.create(req.body)
    //   .then(
    //     (dish) => {
    //       console.log("Account Created ", dish);
    //       res.statusCode = 200;
    //       res.setHeader("Content-Type", "application/json");
    //       res.json(dish);
    //     },
    //     (err) => next(err)
    //   )
    //   .catch((err) => next(err));

    // bắt giúp mình được trường hợp trùng username và gmail
    Accounts.register(new Accounts({ username: req.body.username, password: req.body.password, email: req.body.email, image: req.body.image, gender: req.body.gender, status: req.body.status, phone: req.body.phone, role: req.body.role }),
      req.body.password, (err, user) => {
        // console.log("req",req);
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: err });
        }
        else {
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        }
      });
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
  })
  .delete((req, res, next) => {
    Accounts.deleteMany({})
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

accountRouter
  .route("/:dishId")
  .get((req, res, next) => {
    Accounts.findById(req.params.dishId)
      .then(
        (dish) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
  })
  .put((req, res, next) => {
    Accounts.findByIdAndUpdate(
      req.params.dishId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (dish) => {
          res.statusCode = 200;

          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Accounts.findByIdAndDelete(req.params.dishId)
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

module.exports = accountRouter;
