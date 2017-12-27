const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    required: true,
    type: String,
    trim: true,
    unique: true
  },
  password: {
    required: true,
    type: String
  }
});

userSchema.methods.checkPassword = function(password) {
  var user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, res) => {
      if (err || !res) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

userSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({ _id: user._id.toHexString(), access }, 'secret').toString();
  return token;
}

userSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
