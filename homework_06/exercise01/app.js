const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require("fs");
const cors = require("cors");
const helmet = require("helmet");
const jsonChecker = require("./JsonCheckMiddleWare");
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

var usersRouter = require('./routes/grades');

var app = express();
app.use(helmet());
app.use(cors())
app.use(morgan('combined', { stream: accessLogStream }))
app.use(jsonChecker);
// app.use(express.json());

app.use('/grades', usersRouter);
app.use(cors());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500).send(err.message);
});

// module.exports = app;
app.listen(3000, ()=>{console.log("listen on 3000!")})
