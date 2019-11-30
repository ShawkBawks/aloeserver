var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const request = require('request');
const axios = require("axios");
const sensorControl = require("./sensorControl")
require("dotenv").config();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);



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
// const key = process.env.ACCESS_KEY;
// const  getLocation = function() {
//  return axios
//     .get(
//       `http://api.ipstack.com/check?access_key=${key}&fields=latitude,longitude`
//     )
//     .then(response => {
//       let data = {
//         latitude: response.data.latitude,
//         longitude: response.data.longitude
//       };
//       return data;
// 		});
// 	}

// let latitude = getLocation().then(res => {console.log(res.la)})
// setTimeout(() => {
//   console.log(location.res.latitude, "LATS BRUH");
// }, 2000);
module.exports = app;
