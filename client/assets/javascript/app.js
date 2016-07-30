import session from 'session';
import app from 'application/app';

import 'router/main';

import 'trix';

import '../stylesheet/app.scss';

session.initSession().then(() => {
  app.start();
});
