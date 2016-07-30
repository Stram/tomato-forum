import Backbone from 'backbone';
import app from 'application/app';
import session from 'session';

import LoginView from 'pages/login/component';
import RegisterView from 'pages/register/component';
import ForumView from 'pages/forum/component';
import DashboardView from 'pages/dashboard/component';

const Router = Backbone.Router.extend({

  initialize(options) {
    this.app = options.app;
    this.baseView = this.app.getBaseView();
  },

  routes: {
    '': 'landing',
    login: 'login',
    register: 'register',
    dashboard: 'dashboard',
    forum: 'forum'
  },

  changePage(page, options = {}) {
    if (options.authenticated && !session.isAuthenticated()) {
      this.navigate('login', true);
      return;
    }
    this.baseView.showChildView('main', page);
  },

  landing() {
    const forumView = new ForumView();
    this.changePage(forumView, {
      authenticated: true
    });
  },

  login() {
    const loginView = new LoginView();
    this.changePage(loginView);
  },

  register() {
    const registerView = new RegisterView();
    this.changePage(registerView);
  },

  dashboard() {
    const dashboardView = new DashboardView();
    this.changePage(dashboardView, {
      authenticated: true
    });
  },

  forum() {
    const forumView = new ForumView();
    this.changePage(forumView, {
      authenticated: true
    });
  }
});

let router;

export {router};
export function startRouter() {
  router = new Router({app});
}
