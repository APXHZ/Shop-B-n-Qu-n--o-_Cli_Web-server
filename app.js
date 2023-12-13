var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//session
var session = require('express-session')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// nên để trước tất cả các đường dẫn hoặc link 
app.use(session({
  secret: 'AAAAAAAAAAAAAAAAAAAABBBBBBBBBBB',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true } // bỏ qua nếu cần thiết
}))

//api
var apiRouter = require('./routes/rounter_api');

// Web
var quanaoRouter = require('./routes/rounter_quanao');
app.use('/product', quanaoRouter);

var loginRounter =require("./routes/rounter_login");
app.use('/login',loginRounter);

var adminRounter =require("./routes/rounter_admin");
app.use('/admin',adminRounter);

var usersRouter =require("./routes/rounter_user");
app.use('/user',usersRouter);








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
