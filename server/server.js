import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';

import databaseConfig from './config/database'
import passportConfig from './config/passport'

import api from './api/api';

const app = express();

mongoose.connect(databaseConfig.url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(session({secret: 'asdfagalvneiv3u4kj34j'}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passportConfig(passport);

app.use('/public', express.static(path.resolve('public')));

app.use('/api', api);

app.get(/^(?!\/public|\/api).*$/, function (req, res) {
  res.sendFile(path.resolve('client/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
