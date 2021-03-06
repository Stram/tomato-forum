import Marionette from 'backbone.marionette';
import router from 'application/router';

import template from './template.hbs';
import style from './style.scss';

import RegistrationForm from 'forms/register';

export default Marionette.View.extend({
  template,

  tagName: 'article',

  // className: 'page register-page',

  ui: {
    nextButton: '.js-next-button',
    backToLogin: '.js-navigate-to-login'
  },

  events: {
    'click @ui.nextButton': 'nextButtonClicked',
    'click @ui.backToLogin': 'navigateToLogin'
  },

  regions: {
    form: '.js-form'
  },

  initialize() {
    this.registrationForm = new RegistrationForm();
  },

  templateContext() {
    return {
      style,
      isRegistrationSuccessful: this.isRegistrationSuccessful
    };
  },

  onBeforeAttach() {
    const formView = this.registrationForm.getForm();
    this.showChildView('form', formView);
  },

  nextButtonClicked() {
    this.registrationForm.submit().then(() => {
      this.isRegistrationSuccessful = true;
      this.render();
    });
  },

  navigateToLogin() {
    router.navigate('login', true);
  }
});
