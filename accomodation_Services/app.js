var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var routes = require('./routes/index');
var users = require('./routes/users');
var profile = require('./routes/profile');
var accomodation = require('./routes/accomodation');
var likesComments = require('./routes/likesComments');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({dest: './public/upload', onFileUploadStart: function (file) {
    var fs = require('fs');
    var pathd = 'public\\upload' + '\\' + file.name;
    var result;

    fs.readFile(pathd, function(err, data){
        if(err){
            console.log('hubo un error - en multer');
            return false;
        }else if(data){
            console.log('ingreso en if- la imagen se guardo bien');
            if(data.originalname != file.originalname){
              return true;
            }else{
              return false;
            }
        }else{
            console.log('ingreso en el else- la imagen se mantiene ');
            return false;
        }
    });
}}));

app.use('/', routes);
app.use('/users', users);
app.use('/profile', profile);
app.use('/accomodation', accomodation);
app.use('/likesComments', likesComments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
