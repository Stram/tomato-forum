import Backbone from 'backbone';
import $ from 'jquery';
import RegisterPageView from 'views/pages/register';
import LoginPageView from 'views/pages/login';
import SelectUsernamePageView from 'views/pages/select-username';

const Router = Backbone.Router.extend({
  routes: {
    '': 'landing',
    register: 'register',
    login: 'login',
    username: 'selectUsername'
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

  selectUsername() {
    const selectUsernamePage = new SelectUsernamePageView();
    this.changeView(selectUsernamePage);
  }
});

export default new Router();
