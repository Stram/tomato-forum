import Marionette from 'backbone.marionette';

import template from './template.hbs';
import style from './style.scss';

import router from 'application/router';
import VerifyForm from 'forms/verify';

export default Marionette.View.extend({
  template,

  tagName: 'article',

  ui: {
    nextButton: '.js-next-button'
  },

  events: {
    'click @ui.nextButton': 'nextButtonClicked'
  },

  initialize(options) {
    this.verifyForm = new VerifyForm(options);

    this.termsAndConditions = true;
    this.selectUsername = false;
  },

  templateContext() {
    return {
      style,
      termsAndConditions: this.termsAndConditions,
      selectUsername: this.selectUsername
    };
  },

  nextButtonClicked() {
    if (this.termsAndConditions) {
      this.termsAndConditions = false;
      this.selectUsername = true;

      this.render();
      this.addRegion('form', '.js-form');

      const formView = this.verifyForm.getForm();
      this.showChildView('form', formView);
    } else {
      this.verifyForm.submit().then(() => {
        router.navigate('login', true);
      });
    }
  }
});
