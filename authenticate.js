var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var Account = require('./models/accounts.js');
var config = require('./config.js');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

exports.getToken = function (account) {
  return jwt.sign(account, config.secretKey,
    { expiresIn: 3600 });
};


// var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = config.secretKey;


// exports.jwtPassport = passport.use(new JwtStrategy(opts,
//   (jwt_payload, done) => {
//       console.log("JWT payload: ", jwt_payload);
//       User.findOne({_id: jwt_payload._id}, (err, user) => {
//           if (err) {
//               return done(err, false);
//           }
//           else if (user) {
//               return done(null, user);
//           }
//           else {
//               return done(null, false);
//           }
//       });
//   }));


// bắt buộc phải dùng promise không dùng được callback
exports.jwtPassport = passport.use(
  new JwtStrategy(
      {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: config.secretKey,
      },
      (jwt_payload, done) => {
          Account.findOne({ _id: jwt_payload._id })
              .then(user => {
                  if (user) {
                      return done(null, user);
                  } else {
                      return done(null, false);
                  }
              })
              .catch(err => done(err, false));
      }
  )
);



exports.verifyUser = passport.authenticate('jwt', { session: false });