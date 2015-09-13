var User     = require('../models/user');
var jwt      = require('jsonwebtoken');
var passport = require('passport');
var secret   = require('../config/config').secret;
var express  = require('express');
var router   = express.Router();
var signUp = function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(401).send({ error: 'User already exists!' });

    var token = jwt.sign(user, secret, { expiresInMinutes: 1440 });

    return res.status(200).send({ 
      success: true,
      message: "The user is created.",
      token: token
    });
  })(req, res, next);
}

var signIn =  function(req, res, next) {
  User.findOne({
    codename: req.body.codename
  }, function(err, user) {
    if (err) return res.status(500).send(err);

    if (!user) return res.status(403).send({ message: 'You seem to be mistaken, we have no user with that identity.' });

    if (!user.validPassword(req.body.password)) return res.status(403).send({ message: 'Authentication failed. Wrong password.' });

    var token = jwt.sign(user, secret, { expiresInMinutes: 1440 });

    return res.status(200).send({
      success: true,
      message: 'You are in',
      token: token
    });
  });
}




module.exports = {
  signUp: signUp,
  signIn: signIn
}
