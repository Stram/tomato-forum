import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

import 'styles/app.scss';
import 'services/session';

import 'mobx-react-devtools';

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};
