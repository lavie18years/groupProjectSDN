const express = require('express');
const feedbackRouter = express.Router();
const bodyParser = require('body-parser');

const Feedback = require('../models/feedback');
// const feedbackController = require('../controller/feedbackController');

// feedbackRouter
// .route('/')
// .get(feedbackController.getAllFeedback)
// .post(feedbackController.createNewFeedback);

// feedbackRouter
// .route('/:id')
// .get(feedbackController.getFeedbackById)

// feedbackRouter
// .route('/delete/:id')
// .get(feedbackController.deleteFeedback)

// feedbackRouter
// .route('/edit/:id')
// .get(feedbackController.getFeedbackById)
// .post(feedbackController.updateFeedback)

feedbackRouter.use(bodyParser.json());

feedbackRouter
.route('/')
.get((req, res, next) => {
    Feedback.find({})
        .populate('userId')
        .populate('productId')
        .then(
            (feedback) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(feedback);
            },
            (err) => next(err)
        )
})
// .post((req, res, next) => {
//     Feedback.create(req.body)
//         .then(
//             (feedback) => {
//                 console.log('Feedback Created ', feedback);
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(feedback);
//             },
//             (err) => next(err)
//         )
//         .catch((err) => next(err));
// })
.post(async (req, res, next) => {
    try {
        const feedback = await Feedback.create(req.body);
        console.log('Feedback Created ', feedback);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    } catch (err) {
        next(err);
    }
})
.delete((req, res, next) => {
    Feedback.findByIdAndRemove(req.params.id)
        .then(
            (feedback) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(feedback);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
});



feedbackRouter
.route('/:id')
.put((req, res, next) => {
    Feedback.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    )
        .then(
            (feedback) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(feedback);
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
})
// .get((req, res, next) => {
//     Feedback.findById({ _id: req.params.id, userId: req.query.id, productId: req.query.id })
//         .populate('userId')
//         .populate('productId')
//         .then(
//             (feedback) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(feedback);
//             },
//             (err) => next(err)
//         )
// })
.get(async (req, res, next) => {
    try {
        const { feedbackId, userId, productId } = req.query;

        let query = {};
        if (feedbackId) query._id = feedbackId;
        if (userId) query.userId = userId;
        if (productId) query.productId = productId;

        const feedback = await Feedback.find(query)
            .populate('userId')
            .populate('productId');

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    } catch (err) {
        next(err);
    }
})
;



module.exports = feedbackRouter;