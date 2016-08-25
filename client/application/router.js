import Backbone from 'backbone';
import Radio from 'backbone.radio';

import { getParam } from 'services/url-manager';
import Thread from 'models/thread';
import Category from 'models/category';

import Threads from 'collections/threads';
import Comments from 'collections/comments';

import LoginView from 'pages/login/component';
import RegisterView from 'pages/register';
import ForumView from 'pages/forum';
import DashboardView from 'pages/dashboard/component';
import ThreadView from 'pages/thread';
import VerifyView from 'pages/verify';
import CategoryView from 'pages/category';

const applicationChannel = Radio.channel('application');
const sessionChannel = Radio.channel('session');

const Router = Backbone.Router.extend({

  initialize() {
    this.requestBaseView();
  },

  routes: {
    '': 'landing',
    login: 'login',
    register: 'register',
    dashboard: 'dashboard',
    forum: 'forum',
    'thread/:threadId': 'thread',
    'verify?*querystring': 'verify',
    'category/:categoryId': 'category'
  },

  requestBaseView() {
    this.baseView = applicationChannel.request('view:base:get');
  },

  changePage(page, options = {}) {
    if (!this.baseView) {
      this.requestBaseView();
    }
    const isAuthenticated = sessionChannel.request('user:authenticated');
    if (options.authenticated && !isAuthenticated) {
      this.navigate('login', true);
      return;
    }

    if (options.loading) {
      applicationChannel.trigger('loading:show');
    }

    if (options.sidebar) {
      this.baseView.addSidebar();
    } else {
      this.baseView.removeSidebar();
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
      authenticated: true,
      sidebar: true
    });
  },

  forum() {
    const forumView = new ForumView();
    this.changePage(forumView, {
      authenticated: true,
      loading: true,
      sidebar: true
    });
  },

  thread(threadId) {
    const commentsCollection = new Comments();

    commentsCollection.setPageSize(5);

    const thread = new Thread({
      id: threadId
    });

    const threadView = new ThreadView({
      collection: commentsCollection,
      model: thread,
      threadId
    });

    this.changePage(threadView, {
      authenticated: true,
      loading: true,
      sidebar: true
    });
  },

  verify() {
    const userId = getParam('userId');
    const token = getParam('token');

    const verifyView = new VerifyView({userId, token});
    this.changePage(verifyView);
  },

  category(categoryId) {
    const threadsCollection = new Threads();

    threadsCollection.setPageSize(30);

    const category = new Category({
      id: categoryId
    });

    const categoryView = new CategoryView({
      collection: threadsCollection,
      model: category,
      categoryId
    });

    this.changePage(categoryView, {
      authenticated: true,
      loading: true,
      sidebar: true
    });
  }
});

export default new Router();
