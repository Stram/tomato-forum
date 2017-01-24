import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import passport from 'passport';
import fileUpload from 'express-fileupload';
import fs from 'fs';

import applicationConfig from './config/application';
import passportConfig from './config/passport';

import handleError from './services/handle-error';

import api from './api';

const app = express();

if (process.env.NODE_ENV !== 'testing') {
  app.use(morgan('dev'));

  mongoose.connect(process.env.DATABASE_URL || 'localhost:27017');
}

mongoose.Promise = Promise;

const MongoStore = connectMongo(session);

app.use('/public', express.static(path.resolve('public')));
app.use('/doc', express.static(path.resolve('doc')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'myUserSuperSecret',
  cookie: {
    maxAge: 2628000000
  },
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(fileUpload());

passportConfig(passport);

app.use('/api', api);

app.get('favicon.ico', (req, res) => {
  res.sendFile(path.resolve('public/favicon.ico'));
});

app.get(/^(?!\/public|\/api|\/uploads|\/doc|\/favicon).*$/, function(req, res) {
  res.sendFile(path.resolve('client-react/index.html'));
});

fs.stat(path.resolve('uploads/photos'), function(err) {
  if (err && err.code === 'ENOENT') {
    fs.mkdirSync(path.resolve('uploads'));
    fs.mkdirSync(path.resolve('uploads/photos'));
  }
});

app.use('/uploads/photos', (req, res) => {
  if (!req.user) {
    res.status(401);
    return;
  }

  res.sendFile(path.resolve(`uploads/photos${req.path}`));
});

app.use(handleError);

app.listen(applicationConfig.port, function() {
  console.log(`Example app listening on port ${applicationConfig.port}!`);
});

module.exports = app;
