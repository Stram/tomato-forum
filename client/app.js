import 'backbone-associations';
import 'services/hbs-helpers';

import app from 'application/app';

import 'application/router';
import session from 'services/session';


import 'styles/app.scss';

session.initSession().then(() => {
  app.start();
});
