import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';
import {Provider} from 'mobx-react';

import 'styles/app.scss';
import 'services/session';
import {APP_ID} from 'consts/app';
import createStore from 'stores/creator';

import 'mobx-react-devtools';

const dest = document.getElementById(APP_ID);
const store = createStore();

window.onload = () => {
  ReactDOM.render(
    <Provider {...store}>
      <AppRoutes/>
    </Provider>, dest
  );
};
