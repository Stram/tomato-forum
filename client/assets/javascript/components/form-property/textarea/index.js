import Marionette from 'backbone.marionette';
import $ from 'jquery';
import _ from 'underscore';

import template from './template.hbs';
import style from './style.scss';

export default Marionette.View.extend({
  tagName: 'div',

  className: style.textareaBox,

  template,

  ui: {
    error: '.js-error'
  },

  initialize(args) {
    this.label = args.label;
    this.value = args.value;
    this.inputId = _.uniqueId();
    this.isRequired = args.required;
    this.type = args.type || 'text';
  },

  templateContext() {
    return {
      style,
      label: this.label,
      value: this.value,
      type: this.type,
      inputId: this.inputId,
      isRequired: this.isRequired
    };
  },

  showError(message) {
    this.getUI('error').text(message);
  },

  clearError() {
    this.getUI('error').text('');
  },

  getValue() {
    const value = $(`#${this.inputId}`).val();
    return value;
  }
});
