import React from 'react';
import { Route, IndexRoute } from 'react-router';
import BasicLayout from './components/BasicLayout';
import SidebarLayout from './components/SidebarLayout';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';
import LoginPage from './components/LoginPage';

const routes = (
  <Route path="/" component={BasicLayout}>
    <IndexRoute component={IndexPage}/>
    <Route path="/login" component={LoginPage} />
    <Route component={SidebarLayout}>
      <Route path="/side" component={NotFoundPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;




//     '': 'landing',
//     login: 'login',
//     register: 'register',
//     dashboard: 'dashboard',
//     forum: 'forum',
//     'thread/:threadId': 'thread',
//     'verify?*querystring': 'verify',
//     'category/:categoryId': 'category',
//     '*notFound': 'notFound'
