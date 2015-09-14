var express    = require('express');
var path       = require('path');
var cors       = require('cors');
var expressJWT = require("express-jwt");
var logger     = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var config     = require('./config/config');
var app        = express();
var mongoose   = require('mongoose');
mongoose.connect(config.database);

// Secret JWT phrase, should move to process.env
var secret     = config.secret;

app
.use('/api', expressJWT({secret: config.secret})
.unless({path: ['/api/authorize', '/api/join'], method: 'post'}));

require('./config/passport')(passport);

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// JWT access control. Important to have these before our routes!

  // Require routes
  var routes = require('./config/routes');
  app.use('/api', routes);

  app.listen(process.env.PORT || 3000);


