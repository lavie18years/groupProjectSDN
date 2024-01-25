const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Order = require("../models/order");
const orderRouter = express.Router();
orderRouter.use(bodyParser.json());

orderRouter
  .route("/")
  .get((req, res, next) => {
    Order.find()
      .populate("account")
      .populate("products.product")
      .populate("products.product.category")
      .then(
        (order) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(order);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Order.create(req.body)
      .then(
        (order) => {
          console.log("Order Created ", order);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(order);
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

orderRouter
  .route("/account/:accountId")
  .get((req, res, next) => {
    Order.find({
      account: { $in: req.params.accountId },
    })
      .populate("account")
      .then(
        (order) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(order);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /order/" + req.params.accountId);
  })
  .put((req, res, next) => {
    Order.findOneAndUpdate(
      {
        category: { $in: req.params.accountId },
      },
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (order) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(order);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Order.findByIdAndDelete(req.params.accountId)
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

orderRouter
  .route("/:orderId")
  .get((req, res, next) => {
    Order.findById(req.params.orderId)
      .populate("account")
      .populate("products.product")
      .populate("products.product.category")
      .then(
        (order) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");    
          res.json(order);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /order/" + req.params.orderId);
  })
  .put((req, res, next) => {
    Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (order) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(order);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Order.findByIdAndDelete(req.params.orderId)
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

orderRouter
  .route("/:orderId/products")
  .get((req, res, next) => {
    Order.findById(req.params.orderId)
      .populate("products.product")
      .populate("products.product.category")
      .then(
        (order) => {
          if (order != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(order.products);
          } else {
            err = new Error("order " + req.params.orderId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Order.findById(req.params.orderId)
      .then(
        (order) => {
          if (order != null) {
            order.products.push(req.body);
            order.save().then(
              (order) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(order);
              },
              (err) => next(err)
            );
          } else {
            err = new Error("order " + req.params.orderId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end(
      "PUT operation not supported on /order/" +
        req.params.orderId +
        "/products"
    );
  })
  .delete((req, res, next) => {
    Order.findById(req.params.orderId)
      .then(
        (order) => {
          if (order != null) {
            for (var i = order.products.length - 1; i >= 0; i--) {
              order.products.id(order.products[i]._id).remove();
            }
            order.save().then(
              (order) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(order);
              },
              (err) => next(err)
            );
          } else {
            err = new Error("order " + req.params.orderId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

orderRouter
  .route("/:orderId/products/:productId")
  .get((req, res, next) => {
    Order.findById(req.params.orderId)
      .populate("products.product")
      .then(
        (order) => {
          if (
            order != null &&
            order.products.id(req.params.productId) != null
          ) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(order.products.id(req.params.productId));
          } else if (order == null) {
            err = new Error("order " + req.params.orderId + " not found");
            err.status = 404;
            return next(err);
          } else {
            err = new Error("product " + req.params.productId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      "POST operation not supported on /order/" +
        req.params.orderId +
        "/products/" +
        req.params.productId
    );
  })
  .put((req, res, next) => {
    order
      .findById(req.params.orderId)
      .then(
        (order) => {
          if (
            order != null &&
            order.products.id(req.params.productId) != null
          ) {
            if (req.body.rating) {
              order.products.id(req.params.productId).rating = req.body.rating;
            }
            if (req.body.product) {
              order.products.id(req.params.productId).product =
                req.body.product;
            }
            order.save().then(
              (order) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(order);
              },
              (err) => next(err)
            );
          } else if (order == null) {
            err = new Error("order " + req.params.orderId + " not found");
            err.status = 404;
            return next(err);
          } else {
            err = new Error("product " + req.params.productId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Order.findById(req.params.orderId)
      .then(
        (order) => {
          if (
            order != null &&
            order.products.id(req.params.productId) != null
          ) {
            order.products.id(req.params.productId).remove();
            order.save().then(
              (order) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(order);
              },
              (err) => next(err)
            );
          } else if (order == null) {
            err = new Error("order " + req.params.orderId + " not found");
            err.status = 404;
            return next(err);
          } else {
            err = new Error("product " + req.params.productId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
module.exports = orderRouter;
