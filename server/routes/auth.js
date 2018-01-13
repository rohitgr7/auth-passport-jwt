const router = require('express').Router();
const auth = require('./authFunctions');
const passport = require('passport');

require('./../services/passport');

const authLogin = passport.authenticate('local', { session: false });

const authAccess = passport.authenticate('jwt', { session: false });

router.get('/', auth.home);

router.post('/signup', auth.signup);

router.post('/login', authLogin, auth.login);

router.get('/logout', authAccess, auth.logout);

router.delete('/delete/me', authAccess, auth.deleteMe);

router.patch('/update', authAccess, auth.updateMe);

router.get('/me', authAccess, auth.getMe);

module.exports = router;
