import Backbone from 'backbone';
import $ from 'jquery';

import session from 'session';

import pages from 'pages';

import ContentWrapperView from 'views/pages/content-wrapper';

const Router = Backbone.Router.extend({
  routes: {
    '': 'landing',
    register: 'register',
    login: 'login',
    'verify?userId=:userId&token=:token': 'verify',
    dashboard: 'dashboard',
    'first-steps/photo': 'firstStepsPhoto',
    forum: 'forum'
  },

  pages,
  currentView: null,
  $pageElement: $('.page-content'),

  changeView(view) {
    if (this.currentView) {
      this.currentView.close();
    }

    if (!this.$pageElement.length) {
      this.$pageElement = $('.page-content');
    }

    this.currentView = view;
    view.render();
    this.$pageElement.html(view.el);

    console.log(`changing view to ${view.className}`);
  },

  changeWrappedView(view) {
    if (!this.contentWrapperView) {
      this.contentWrapperView = new ContentWrapperView();
      this.changeView(this.contentWrapperView);
    }
    this.contentWrapperView.changeCurrentView(view);
  },

  changePage(pageName, ...args) {
    const pageObject = this.pages[pageName];
    if (pageObject) {
      if (pageObject.authenticated && !session.isAuthenticated()) {
        this.navigate('login', true);
        return;
      }
      const pageView = new pageObject.View(args);
      if (pageObject.wrapped) {
        this.changeWrappedView(pageView);
      } else {
        this.changeView(pageView);
      }
    } else {
      // TODO: 404
    }
  },

  landing() {
    this.changePage('landing');
  },

  register() {
    this.changePage('register');
  },

  login() {
    this.changePage('login');
  },

  verify(userId, token) {
    this.changePage('verify', {userId, token});
  },

  dashboard() {
    this.changePage('dashboard');
  },

  firstStepsPhoto() {
    this.changePage('firstStepsPhoto');
  },

  forum() {
    this.changePage('forum');
  }

});

export default new Router();
