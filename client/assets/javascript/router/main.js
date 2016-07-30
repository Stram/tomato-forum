import Backbone from 'backbone';
import app from 'application/app';
import session from 'session';

import ForumView from 'pages/forum/component';
import LoginView from 'pages/login/component';

const Router = Backbone.Router.extend({

  initialize(options) {
    this.app = options.app;
    this.baseView = this.app.getBaseView();
  },

  routes: {
    '': 'landing',
    login: 'login',
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

  forum() {
    const forumView = new ForumView();
    this.changePage(forumView, {
      authenticated: true
    });
  }

});

let router;

export default router;
export function startRouter() {
  router = new Router({app});
}
