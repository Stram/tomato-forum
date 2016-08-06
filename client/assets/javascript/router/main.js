import Backbone from 'backbone';
import app from 'application/app';
import session from 'session';

import ContentWrapperView from 'pages/content-wrapper/component';

import LoginView from 'pages/login/component';
import RegisterView from 'pages/register/component';
import ForumView from 'pages/forum/component';
import DashboardView from 'pages/dashboard/component';
import ThreadView from 'pages/thread/component';

const Router = Backbone.Router.extend({

  initialize() {
    this.baseView = app.getBaseView();
  },

  routes: {
    '': 'landing',
    login: 'login',
    register: 'register',
    dashboard: 'dashboard',
    forum: 'forum',
    'thread/:threadId': 'thread'
  },

  showContentWrappedPage(page) {
    this.contentView = this.contentView || new ContentWrapperView();
    this.baseView.showChildView('main', this.contentView);
    this.contentView.showChildView('content', page);
  },

  changePage(page, options = {}) {
    if (options.authenticated && !session.isAuthenticated()) {
      this.navigate('login', true);
      return;
    }
    if (options.wrapped) {
      this.showContentWrappedPage(page);
    } else {
      this.baseView.showChildView('main', page);
    }
  },

  landing() {
    const forumView = new ForumView();
    this.changePage(forumView, {
      authenticated: true,
      wrapped: true
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
      authenticated: true,
      wrapped: true
    });
  },

  forum() {
    const forumView = new ForumView();
    this.changePage(forumView, {
      authenticated: true,
      wrapped: true
    });
  },

  thread(threadId) {
    const threadView = new ThreadView({threadId});
    this.changePage(threadView, {
      authenticated: true,
      wrapped: true
    });
  }
});

export default new Router();
