const express = require('express');
const userRouter = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user');


userRouter.use(bodyParser.json());

userRouter
.route('/')
.get((req, res, next) => {
    User.find({})
        .then(
            (user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            },
            (err) => next(err)
        )
})
.post((req, res, next) => {
    User.create(req.body)
        .then(
            (user) => {
                console.log('User Created ', user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
})
.put((req, res, next) => {
    User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    )
        .then(
            (user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
})
.delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id)
        .then(
            (user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
});

module.exports = userRouter;