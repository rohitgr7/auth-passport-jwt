const router = require('express').Router();
const auth = require('./authFunctions');
const passport = require('passport');

require('./../services/passport');

const authLogin = passport.authenticate('local', { session: true });

const ensureAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(400).send();
  }
};

const authAccess = passport.authenticate('jwt', { session: false });

router.get('/', auth.home);

router.post('/signup', auth.signup);

router.post('/login', authLogin, auth.login);

router.get('/logout', ensureAuthentication, auth.logout);

router.delete('/delete/me', ensureAuthentication, auth.deleteMe);

router.patch('/update', ensureAuthentication, auth.updateMe);

router.get('/me', ensureAuthentication, auth.getMe);

module.exports = router;
