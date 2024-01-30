const express = require('express');
const feedbackRouter = express.Router();
const bodyParser = require('body-parser')
;
const  multer  = require('multer');
const storage = multer.memoryStorage();  // Store files in memory (for demo)
const upload = multer({ storage: storage });



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
.get(async(req, res, next) => {
    try {
        const feedback = await Feedback.find({})
            .populate('userId', 'name _id')
            .populate('productId' , 'name _id');
            res.status(200).send({ message: 'Feedback match ', feedback });
    } catch (err) {
        next(err);
    }
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
// .post(async (req, res, next) => {
//     try {
//         const feedback = await Feedback.create(req.body);
//         console.log('Feedback Created ', feedback);
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(feedback);
//     } catch (err) {
//         next(err);
//     }
// })
.post(upload.single('content'),async (req, res, next) => {
    try {

        const content = req.body.content;  // Access other form fields
        const userId = req.body.userId;
        const productId = req.body.productId;

        const feedback = await Feedback.create(req.body);    
        console.log('Feedback Created ', feedback);
        res.status(200).send({ message: 'Feedback Created ', feedback });
        // res.json(feedback);


        
    } catch (err) {
        next(err);
    }});




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

.get(async (req, res, next) => {
    try {
        const { feedbackId, userId, productId } = req.query;

        let query = {};
        if (feedbackId) query._id = feedbackId;
        if (userId) query.userId = userId;
        if (productId) query.productId = productId;

        const feedback = await Feedback.find(query)
            .populate('userId', 'name _id')
            .populate('productId', 'name _id');

        res.status(200).send({ message: 'Feedback match ', feedback });
        // res.setHeader('Content-Type', 'application/json');
        // res.json(feedback);
    } catch (err) {
        next(err);
    }
})
.delete(async (req, res, next) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Feedback has remove', feedback});
    } catch (err) {
        next(err);
    }
})
;



module.exports = feedbackRouter;