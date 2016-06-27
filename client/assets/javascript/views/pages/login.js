import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import config from 'config';
import template from 'views/templates/login.html';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page login-page',

  events: {
    'click .js-submit': 'submit'
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

  submit() {
    const $form = this.$('.js-form');
    const identification = $form.find('.js-identification').val();
    const password = $form.find('.js-password').val();

    $.ajax({
      url: `${config.apiEndpoint}/user`,
      method: 'POST',
      data: {
        identification,
        password
      }
    }).done((user) => {
      console.log(user);
    });
  }
});
