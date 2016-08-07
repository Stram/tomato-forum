import session from 'session';
import app from 'application/app';

import 'application/router';

import '../stylesheet/app.scss';

session.initSession().then(() => {
  app.start();
});
