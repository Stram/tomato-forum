import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import config from 'config';
import template from 'views/pages/templates/register';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page register-page',

  events: {
    'click .js-submit': 'submit'
  },

  submit() {
    const $form  = this.$('.js-form');
    const email = $form.find('.js-email').val();
    const password = $form.find('.js-password').val();

    $.ajax({
      url: `${config.apiEndpoint}/user`,
      method: 'POST',
      data: {
        email,
        password
      }
    });
  },

  // // TODO:
  // initialize() {
  //   this.listenTo(this.model, 'change', this.render);
  // },

  template: _.template(template),

  render() {
    this.$el.html(
      this.template()
    );

    return this;
  }

});
