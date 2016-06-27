import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import config from 'config';
import template from 'views/templates/register.html';
import router from 'router';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page register-page',

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
    const email = $form.find('.js-email').val();
    const password = $form.find('.js-password').val();

    $.ajax({
      url: `${config.apiEndpoint}/user/register`,
      method: 'POST',
      data: {
        email,
        password
      }
    }).done((response) => {
      const user = response.user;
      router.navigate(`verify/username/${user.id}`, true);
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
