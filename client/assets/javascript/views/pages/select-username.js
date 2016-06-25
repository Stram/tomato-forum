import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import config from 'config';
import template from 'views/pages/templates/select-username.html';
import router from 'router';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page select-username-page',

  events: {
    'submit .js-form': 'submit'
  },

  template: _.template(template()),

  initialize(args) {
    this.userId = args.userId;
  },

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
    const username = $form.find('.js-username').val();
    const userId = this.userId;

    $.ajax({
      url: `${config.apiEndpoint}/user/${userId}`,
      method: 'PATCH',
      data: {
        username
      }
    }).done(() => {
      router.navigate('login', true);
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
