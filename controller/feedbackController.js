const feedback = require('../models/feedback');
class feedbackController {
    // getAllFeedback(req, res, next) {
    //     feedback.find({}).then((feedback) => res.json(feedback
            
    //         )).catch(next);
    // }

    getAllFeedback(req, res, next) {
        feedback.find({}).then((feedback) => {
            res.render('feedback', {
                feedback: feedback
            });
        }).catch(next);
    }
    createNewFeedback(req, res, next) {
        const feedback = new feedback(req.body);
        feedback.create(req.body)
            .then((feedback) => res.json(feedback))
            .catch(next);
    }
    getFeedbackById(req, res, next) {
        const { id} = req.params;
        feedback.findById(id)
            .then((feedback) => {
                res.render('feedback', {
                    feedback: feedback
                });
            }).catch(next);
    }
    deleteFeedback(req, res, next) {
        const { id } = req.params;
        feedback.findByIdAndDelete(id)
            .then((feedback) => res.json(feedback))
            .catch(next);
    }
    updateFeedback(req, res, next) {
        feedback.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/feedback'))
            .catch(next);
    }
}