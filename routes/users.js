var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate');
const Accounts = require('../models/accounts');
const usersRouter = express.Router();
const bcrypt = require('bcrypt');

/* GET users listing. */
// router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
//   console.log("req", req);
//   var token = authenticate.getToken({ _id: req.user._id });
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'application/json');
//   res.json({ success: true, token: token, status: 'You are successfully logged in!' });
// });
usersRouter.route("/login").post(async (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    try {
      console.log("user", user);
      const member = await Accounts.findOne({ username: req.body.username });
      console.log("member", member);

      if (err) {
        return next(err);
      }

      if (!member) {
        return res.status(401).json({ success: false, message: 'Authentication failed. Invalid username or password.' });
      }

      // Kiểm tra mật khẩu đã hash
      bcrypt.compare(req.body.password, member.password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ success: false, message: 'Authentication failed. Invalid username or password.' });
        }
        // Nếu mật khẩu hợp lệ, tiếp tục
        req.login(member, { session: false }, (err) => {
          if (err) {
            return next(err);
          }
          const token = authenticate.getToken({ _id: user._id });
          res.status(200).json({ success: true, token: token, status: 'You are successfully logged in!' });
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});


module.exports = usersRouter;
