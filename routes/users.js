var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate');
/* GET users listing. */
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  console.log("req", req);
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});


module.exports = router;
