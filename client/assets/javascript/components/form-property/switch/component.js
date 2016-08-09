import Marionette from 'backbone.marionette';

import $ from 'jquery';
import _ from 'underscore';

import template from './template.hbs';

export default Marionette.View.extend({
  tagName: 'div',

  className: 'input-box',

  initialize(args) {
    this.name = args.name;
    this.value = args.value;
    this.inputId = _.uniqueId();
    this.isRequired = args.required;
  },

  template,

  templateContext() {
    return {
      label: this.name,
      value: this.value,
      inputId: this.inputId,
      isRequired: this.isRequired
    };
  },

  getValue() {
    const value = $(`#${this.inputId}`).val();
    return value;
  }
});
