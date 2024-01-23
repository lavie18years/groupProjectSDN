const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Product = require("../models/product");
const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter
  .route("/")
  .get((req, res, next) => {
    // Product.find({})
    Product.find()
      .populate("category")
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
    Product.create(req.body)
      .then(
        (product) => {
          console.log("product Created ", product);
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
    res.end("PUT operation not supported on /Product");
  })
  .delete((req, res, next) => {
    Product.deleteMany({})
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

productRouter
  .route("/:productId")
  .get((req, res, next) => {
    Product.findById(req.params.productId)
      .then(
        (product) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(product);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /Product/" + req.params.productId);
  })
  .put((req, res, next) => {
    Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (product) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(product);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Product.findByIdAndDelete(req.params.productId)
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
productRouter
  .route("/:productId/comments")
  .get((req, res, next) => {
    Product.findById(req.params.productId)
      .then(
        (product) => {
          if (product != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(product.comments);
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
    Product.findById(req.params.productId)
      .then(
        (product) => {
          if (product != null) {
            product.comments.push(req.body);
            product.save().then(
              (product) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(product);
              },
              (err) => next(err)
            );
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
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end(
      "PUT operation not supported on /Product/" +
        req.params.productId +
        "/comments"
    );
  })
  .delete((req, res, next) => {
    Product.findById(req.params.productId)
      .then(
        (product) => {
          if (product != null) {
            for (var i = product.comments.length - 1; i >= 0; i--) {
              product.comments.id(product.comments[i]._id).remove();
            }
            product.save().then(
              (product) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(product);
              },
              (err) => next(err)
            );
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

productRouter
  .route("/:productId/comments/:commentId")
  .get((req, res, next) => {
    Product.findById(req.params.productId)
      .then(
        (product) => {
          if (
            product != null &&
            product.comments.id(req.params.commentId) != null
          ) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(product.comments.id(req.params.commentId));
          } else if (product == null) {
            err = new Error("product " + req.params.productId + " not found");
            err.status = 404;
            return next(err);
          } else {
            err = new Error("Comment " + req.params.commentId + " not found");
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
      "POST operation not supported on /Product/" +
        req.params.productId +
        "/comments/" +
        req.params.commentId
    );
  })
  .put((req, res, next) => {
    Product.findById(req.params.productId)
      .then(
        (product) => {
          if (
            product != null &&
            product.comments.id(req.params.commentId) != null
          ) {
            if (req.body.rating) {
              product.comments.id(req.params.commentId).rating =
                req.body.rating;
            }
            if (req.body.comment) {
              product.comments.id(req.params.commentId).comment =
                req.body.comment;
            }
            product.save().then(
              (product) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(product);
              },
              (err) => next(err)
            );
          } else if (product == null) {
            err = new Error("product " + req.params.productId + " not found");
            err.status = 404;
            return next(err);
          } else {
            err = new Error("Comment " + req.params.commentId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Product.findById(req.params.productId)
      .then(
        (product) => {
          if (
            product != null &&
            product.comments.id(req.params.commentId) != null
          ) {
            product.comments.id(req.params.commentId).remove();
            product.save().then(
              (product) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(product);
              },
              (err) => next(err)
            );
          } else if (product == null) {
            err = new Error("product " + req.params.productId + " not found");
            err.status = 404;
            return next(err);
          } else {
            err = new Error("Comment " + req.params.commentId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
module.exports = productRouter;
