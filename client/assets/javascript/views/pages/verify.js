import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import config from 'config';
import router from 'router';

import template from 'views/templates/verify.html';
import termsTemplate from 'views/templates/verify/terms.html';
import usernameTemplate from 'views/templates/verify/username.html';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page verify-page',

  events: {
    'click .js-action': 'buttonClicked'
  },

  template: _.template(template()),

  initialize(args) {
    this.step = 1;
    this.userId = args.userId;
    this.token = args.token;
  },

  render() {
    this.$el.html(
      this.template()
    );

    const $card = this.$('.js-verify-card');
    const $content = $card.find('.js-content');
    const $action = $card.find('.js-action');

    switch (this.step) {
    case 1:
      $content.html(termsTemplate());
      $action.text('ACCEPT');
      break;
    case 2:
      $content.html(usernameTemplate());
      $action.text('DONE');
      break;
    default:
      $content.html(termsTemplate());
      $action.text('ACCEPT');
      break;
    }

    return this;
  },

  close() {
    this.remove();
  },

  buttonClicked() {
    if (this.step === 1) {
      this.step = 2;
      this.render();
    } else if (this.step === 2) {
      const self = this;
      const username = this.$('.js-username').val();
      const userId = this.userId;
      const token = this.token;

      $.ajax({
        url: `${config.apiEndpoint}/user/verify`,
        method: 'POST',
        data: {
          username,
          userId,
          token
        }
      }).done(() => {
        router.navigate('login', true);
      }).fail((jqXHR) => {
        if (jqXHR.status >= 400) {
          const errors = jqXHR.responseJSON.errors;
          _.each(errors, (error) => {
            self.$(`.js-error-${error.field}`).text(error.message);
          });
        }
      });
    }
  }
});
