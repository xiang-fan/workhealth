var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const basicAuth = require('./auth')
const swaggerDocument = require('./docs/swagger');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const questionnaireRouter = require('./routes/questionnaire');
const screeningHistoryRouter = require('./routes/screening-history');

var app = express();

app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization')
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static(path.join(__dirname, 'public')));

app.use(basicAuth);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/auth', authRouter);
app.use('/questionnaire', questionnaireRouter);
app.use('/screeningHistory', screeningHistoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.status(404).send();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
