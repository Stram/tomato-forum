import Backbone from 'backbone';
import Radio from 'backbone.radio';

import session from 'application/session';
import Thread from 'models/thread';

import LoginView from 'pages/login/component';
import RegisterView from 'pages/register/component';
import ForumView from 'pages/forum';
import DashboardView from 'pages/dashboard/component';
import ThreadView from 'pages/thread/component';

const applicationChannel = Radio.channel('application');

const Router = Backbone.Router.extend({

  initialize() {
    this.baseView = applicationChannel.request('view:base:get');
  },

  routes: {
    '': 'landing',
    login: 'login',
    register: 'register',
    dashboard: 'dashboard',
    forum: 'forum',
    'thread/:threadId': 'thread'
  },

  changePage(page, options = {}) {
    if (options.authenticated && !session.isAuthenticated()) {
      this.navigate('login', true);
      return;
    }

    if (options.loading) {
      applicationChannel.trigger('loading:show');
    }

    this.baseView.addSidebar();
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
      authenticated: true,
      loading: true
    });
  },

  thread(threadId) {
    const threadView = new ThreadView({
      model: new Thread({
        id: threadId
      })
    });

    this.changePage(threadView, {
      authenticated: true,
      loading: true
    });
  }
});

export default new Router();
