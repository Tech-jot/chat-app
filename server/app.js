var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
const mongoose = require("mongoose");
require("dotenv").config(); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const socketIo = require('socket.io');

const server = http.createServer(app);
mongoose.connect(
  "mongodb://localhost:27017/demo", 

);
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // React app origin
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (data) => {
    console.log(`Message from client: ${data}`);
    io.emit('message', `Server received: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


module.exports = app;


// index.js

/**
 * 

const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const app = express();
app.use(cors());
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // React app origin
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (data) => {
    console.log(`Message from client: ${data}`);
    io.emit('message', `Server received: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

 */