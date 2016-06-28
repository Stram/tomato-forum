import Backbone from 'backbone';
import $ from 'jquery';

import session from 'session';

import RegisterPageView from 'views/pages/register';
import LoginPageView from 'views/pages/login';
import VerifyPageView from 'views/pages/verify';
import DashboardPageView from 'views/pages/dashboard';
import FirstStepsPhotoPageView from 'views/pages/first-steps/photo';

const Router = Backbone.Router.extend({
  routes: {
    '': 'landing',
    register: 'register',
    login: 'login',
    'verify?userId=:userId&token=:token': 'verify',
    dashboard: 'dashboard',
    'first-steps/photo': 'firstStepsPhoto'
  },

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

  landing() {
    const registerPage = new RegisterPageView();
    this.changeView(registerPage);
  },

  register() {
    const registerPage = new RegisterPageView();
    this.changeView(registerPage);
  },

  login() {
    const loginPage = new LoginPageView();
    this.changeView(loginPage);
  },

  verify(userId, token) {
    const verifyPage = new VerifyPageView({
      userId, token
    });
    this.changeView(verifyPage);
  },

  dashboard() {
    const dashboardView = new DashboardPageView();
    this.changeView(dashboardView);
  },

  firstStepsPhoto() {
    if (session.isAuthenticated()) {
      const firstStepsPhotoView = new FirstStepsPhotoPageView();
      this.changeView(firstStepsPhotoView);
      return;
    }
    this.navigate('login', true);
  }
});

export default new Router();
