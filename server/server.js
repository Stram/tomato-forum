import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import fileUpload from 'express-fileupload';

import 'babel-register';

import applicationConfig from './config/application';
import databaseConfig from './config/database';
import passportConfig from './config/passport';

import api from './api/api';

const app = express();

mongoose.connect(databaseConfig.url);

app.use('/public', express.static(path.resolve('public')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(session({secret: 'asdfagalvneiv3u4kj34j'}));

app.use(passport.initialize());
app.use(passport.session());

app.use(fileUpload());

passportConfig(passport);

app.use('/api', api);

app.get(/^(?!\/public|\/api|\/uploads).*$/, function(req, res) {
  res.sendFile(path.resolve('client/index.html'));
});

app.use('/uploads/photos', (req, res) => {
  if (!req.user) {
    res.status(401);
    return;
  }

  res.sendFile(path.resolve(`uploads/photos${req.path}`));
});

app.listen(applicationConfig.port, function() {
  console.log(`Example app listening on port ${applicationConfig.port}!`);
});
