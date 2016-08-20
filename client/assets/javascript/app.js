import app from 'application/app';

import 'application/router';
import session from 'application/session';


import 'styles/app.scss';

session.initSession().then(() => {
  app.start();
});
