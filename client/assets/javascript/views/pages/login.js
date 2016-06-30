import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import config from 'config';
import template from 'views/templates/login.html';
import router from 'router';
import session from 'session';

import User from 'models/user';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page login-page',

  events: {
    'submit .js-form': 'submit'
  },

  template: _.template(template()),

  render() {
    this.$el.html(
      this.template()
    );

    return this;
  },

  close() {
    this.remove();
  },

  submit(event) {
    event.preventDefault();
    const $form = this.$('.js-form');
    const identification = $form.find('.js-identification').val();
    const password = $form.find('.js-password').val();

    $.ajax({
      url: `${config.apiEndpoint}/user/login`,
      method: 'POST',
      data: {
        identification,
        password
      }
    }).done((response) => {
      session.setCurrentUser(new User(response.user));
      // router.navigate('dashboard', true);
      // TODO: TESTING!
      router.navigate('first-steps/photo', true);

    }).fail((jqXHR) => {
      if (jqXHR.status >= 400) {
        const errors = jqXHR.responseJSON.errors;
        _.each(errors, (error) => {
          $form.find(`.js-error-${error.field}`).text(error.message);
        });
      }
    });
  }
});
