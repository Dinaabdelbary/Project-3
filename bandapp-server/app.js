const express = require("express");
const logger = require('morgan');
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt');
const MongoStore = require('connect-mongo');

require('./db/index')

const ipinfo = require('ipinfo-express');

const User = require('./models/User.model');




require('./configs/passport.js');

const app = express();


const cors = require('cors');

app.use(cors());
const url = 'mongodb://localhost/bandmatchDB' || process.env.MONGO_URI;
let store = new MongoStore({
  mongoUrl: url,
  collection: "sessions"
});
// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/User.routes");
app.use("/api", allRoutes);


app.use(session({
  secret: "javascipt is fun",
  resave: false,
  store: store,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());


const app_name = require('./package.json').name;


// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(ipinfo({
  token: 'f0585fac666470',
  cache: null,
  timeout: 5000
}));

app.use(express.static(path.join(__dirname, 'frontend/build')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);


const auth = require('./routes/auth');
app.use('/api/auth', auth);



module.exports = app;

