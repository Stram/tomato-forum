import Backbone from 'backbone';
import _ from 'underscore';
import template from 'views/templates/login.html';
import router from 'router';
import session from 'session';

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

    session.login(identification, password).then((user) => {
      console.log(user);
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
  }
});
