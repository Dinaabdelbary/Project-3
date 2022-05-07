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

const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User.model');

require('./configs/passport.js');

const app = express();

mongoose
  .connect(process.env.MONGO_CONNECT || 'mongodb://localhost/bandmatchDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
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


app.use(express.static(path.join(__dirname, 'frontend/build')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes);

const connectRoutes = require("./routes/connect.routes");
app.use("/connect", connectRoutes);


const auth = require('./routes/auth');
app.use('/api/auth', auth);



module.exports = app;