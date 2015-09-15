var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User             = require("../models/user");
var jwt              = require('jsonwebtoken');
var secret           = require("./config").secret;

module.exports = function(passport) {
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({ 'email' : email }, function(err, user) {
        
        if (err) return done(err);
        if (user) return done(null, false);

        var newUser       = new User();
        newUser.email     = email;
        newUser.full_name = req.body.full_name;
        newUser.password  = newUser.encrypt(password);
        newUser.save(function(err) {
          if (err) return done(err);
          return done(null, newUser);
        });
      });
    });
  }));


  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log('deserializing user:',user);
      done(err, user);
    });
  });

  passport.use('facebook', new FacebookStrategy({
    clientID        : process.env.FACEBOOK_KEY_API,
    clientSecret    : process.env.FACEBOOK_SECRET_API,
    callbackURL     : 'http://localhost:3000/api/auth/facebook/callback',
    enableProof     : true,
    profileFields   : ['name', 'emails']
  }, function(access_token, refresh_token, profile, done) {    
    // console.log(profile)

    process.nextTick(function() {

      User.findOne({ 'email' : profile.emails[0].value }, function(err, user) {
        if (err) return done(err);
        if (user) {
          // Update user
          return done(null, user);
        } else {
          
          var newUser = new User();
          newUser.full_name      = profile.name.givenName + " " + profile.name.familyName;
          newUser.access_token   = access_token;
          newUser.email          = profile.emails[0].value;
          newUser.password       = jwt.sign(access_token, secret);

          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        };
      });
    });
  }));
}