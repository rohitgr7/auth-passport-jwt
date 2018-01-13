const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const auth = require('./routes/auth');
require('./database/db');

// Express Middleware
const app = express();

// CORS Middleware
app.use(cors());

// Body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());

// routes
app.use('/', auth);

// Port
const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
