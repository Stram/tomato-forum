import Marionette from 'backbone.marionette';
import _ from 'underscore';
import $ from 'jquery';
import config from 'config';
import template from './template.hbs';

export default Marionette.View.extend({
  tagName: 'article',

  className: 'page register-page',

  ui: {
    form: '.js-form'
  },

  events: {
    'submit @ui.form': 'submit'
  },

  template,

  close() {
    this.remove();
  },

  submit(event) {
    event.preventDefault();
    const $form = this.getUI('form');
    const email = $form.find('.js-email').val();
    const password = $form.find('.js-password').val();

    $.ajax({
      url: `${config.apiEndpoint}/users/register`,
      method: 'POST',
      data: {
        email,
        password
      }
    }).done(() => {
      // TODO: Handle successful registration

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
