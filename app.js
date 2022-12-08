var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user');

require('dotenv').config();

var indexRouter = require('./routes/index');

var app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(
  new LocalStrategy( (username, password, done) => {
    User.findOne({ username: username}, (err, user) => {
      if (err) return done(err);

      if (!user) return done(null, false, { message: 'Incorrect usernmame or password!' });

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return done(err);

        if (isMatch) return done(null, user);

        else return done(null, false, { message: 'Incorrect username or password!' });
      });
    });
  })
);

passport.serializeUser((user, done) => done(null, user.id) );

passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

app.use(session({ secret: 'og', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
