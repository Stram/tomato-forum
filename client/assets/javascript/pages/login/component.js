import Marionette from 'backbone.marionette';
import _ from 'underscore';

import router from 'application/router';
import session from 'session';

import template from './template.hbs';

export default Marionette.View.extend({
  tagName: 'article',

  className: 'page login-page',

  ui: {
    form: '.js-form',
    registerButton: '.js-register'
  },

  events: {
    'submit @ui.form': 'submit',
    'click @ui.registerButton': 'toRegister'
  },

  template,

  close() {
    this.remove();
  },

  submit(event) {
    event.preventDefault();
    const $form = this.getUI('form');
    const identification = $form.find('.js-identification').val();
    const password = $form.find('.js-password').val();

    session.login(identification, password).then((user) => {
      if (user.photos.length) {
        router.navigate('dashboard', true);
      } else {
        router.navigate('first-steps/photo', true);
      }
    }).catch((errors) => {
      _.each(errors, (error) => {
        $form.find(`.js-error-${error.field}`).text(error.message);
      });
    });
  },

  toRegister() {
    router.navigate('register', true);
  }
});
