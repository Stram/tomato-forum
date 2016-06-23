import Backbone from 'backbone';
import $ from 'jquery';
import RegisterPageView from 'views/pages/register';

export default Backbone.Router.extend({

  routes: {
    '': 'register',
    'register': 'register',
    'login': 'login'
  },

  register() {
    const registerPage = new RegisterPageView();
    registerPage.render();
    $('.page-content').html(registerPage.el);
  },

  login() {

  }
});
