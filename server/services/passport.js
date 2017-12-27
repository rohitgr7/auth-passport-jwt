const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('./../models/user');

// Local Authentication
const localOptions = { usernameField :'email' };

const localAuth = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        done(null, false);
      } else {
        return user.checkPassword(password)
          .then(() => {
            const token = user.generateAuthToken();
            done(null, user);
          });
      }
    }).catch(e => {
      done(null, false);
    });
});

// JWT Authentication
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('p-auth'),
  secretOrKey: 'secret'
};

const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload._id)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    }).catch(e => {
      done(e, false);
    });
});

passport.use(localAuth);
passport.use(jwtAuth);
