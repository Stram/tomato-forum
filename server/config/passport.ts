import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import {Request} from 'express';
import User from 'models/user';

const LocalStrategy = passportLocal.Strategy;

export default function() {

  passport.serializeUser((user: User, done: Function) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: Function) => {
    User.findById(id).then((user) => {
      done(null, user);
    }, (error) => {
      done(error);
    });
  });

  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email: string, password: string, done: (error: any, user: User | null, info?: any) => void) => {

    const user = await User.query({'local.email': email});

    if (user) {
      done(null, null, {
        message: 'Email is already taken.'
      });
      return;
    }

    const newUser = await User.create({
      email,
      password
    });

    done(null, newUser);
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'identification',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req: Request, identification: string, password: string, done: (error: any, user: User | null, info?: any) => void) => {
    const userQuery = identification.includes('@') ? {'local.email': identification} : {username: identification};
    const user = await User.findOne(userQuery);

    if (!user) {
      done(null, null, {message: 'Wrong username/email'});
      return;
    }

    if (!user.validatePassword(password)) {
      done(null, null, {message: 'Incorrect password'});
      return;
    }

    // if (user.token) {
    //   return done(null, false, {message: 'Please verify email first'});
    // }

    req.logIn(user, (error) => {
      done(error, user);
    });
  }));

  return [
    passport.initialize(),
    passport.session()
  ];
}
