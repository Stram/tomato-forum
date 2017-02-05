import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import {Request} from 'express';

import User from 'models/user';
import QueryBuilder from 'services/query-builder';

const LocalStrategy = passportLocal.Strategy;

export default function(): any[] {

  passport.serializeUser((user: User, done: Function) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: number, done: Function) => {
    User.find(id).then((user: User) => {
      done(null, user);
    }, (error: Error) => {
      done(error);
    });
  });

  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req: Request, email: string, password: string, done: (error: any, user: User | null, info?: any) => void) => {

    console.log('REGISTER12');

    const builder = new QueryBuilder();
    builder.select().where('email', email).limit(1);
    const user = await User.query(builder);

    console.log('REGISTER13', user);

    if (user.length) {
      done(null, null, {
        message: 'Email is already taken.'
      });
      return;
    }

    console.log('REGISTER14');

    const newUser = await User.create({
      email,
      password
    });

    console.log('NEW: ', newUser)

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
