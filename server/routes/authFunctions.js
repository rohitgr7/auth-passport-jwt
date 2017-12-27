const _ = require('lodash');
const User = require('./../models/user');

module.exports = {
  home: (req, res) => {
    res.send('Welcome');
  },

  signup: async (req, res) => {
    try {
      const body = _.pick(req.body, ['name', 'email', 'password']);
      let user = await User.findOne({ email: body.email });
      if (user) {
        throw 'Email already exist';
      } else {
        user = new User(body);
        const newUser = await user.save();
        res.send(newUser);
      }
    } catch(e) {
      res.status(400).send(e);
    }
  },

  login: (req, res) => {
    res.send(req.user);
  },

  logout: (req, res) => {
    req.logout();
    res.send('logged-out');
  },

  deleteMe: async (req, res) => {
    try {
      await User.findByIdAndRemove(req.user._id);
      req.logout();
      res.send('deleted');
    } catch(e) {
      res.status(400).send();
    }
  },

  updateMe: async (req, res) => {
    try {
      const { name, password } = req.body;
      let user = await User.findById(req.user._id);
      if (name) {
        user.name = name;
      }
      if (password) {
        user.password = password;
      }
      const updatedUser = await user.save();
      res.send(updatedUser);
    } catch(e) {
      res.status(400).send();
    }
  },

  getMe: (req, res) => {
    res.send(req.user);
  }
};
