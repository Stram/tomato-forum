import passportLocal from 'passport-local';
import User from '../models/user';

const LocalStrategy = passportLocal.Strategy;

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(error, user) {
      done(error, user);
    });
  });

  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({'local.email': email}, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false, {
            error: {
              message: 'That email is already taken.',
              field: 'email'
            }
          });
        }
        const newUser = new User();

        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        newUser.save((error) => {
          if (error) {
            throw error;
          }
          return done(null, newUser);
        });
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'identification',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, identification, password, done) {
    let userQuery = {username: identification};
    if (identification.contains('@')) {
      userQuery = {'local.email': identification};
    }
    User.findOne(userQuery, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }

      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }

      return done(null, user);
    });
  }));
};
