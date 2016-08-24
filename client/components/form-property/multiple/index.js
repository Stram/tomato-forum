import Marionette from 'backbone.marionette';
import $ from 'jquery';
import _ from 'underscore';

import template from './template.hbs';
import style from './style.scss';

export default Marionette.View.extend({
  tagName: 'div',

  className: style.selectBox,

  template,

  initialize(args) {
    this.label = args.label;
    this.inputId = _.uniqueId();

    const value = args.value;

    const labelProperty = args.labelProperty;
    this.options = [];
    if (args.collection) {
      this.options = args.collection.toArray().map((option) => {
        return {
          value: option.id,
          label: option.get(labelProperty),
          selected: value === option.id
        };
      });
    }
  },

  templateContext() {
    return {
      style,
      label: this.label,
      inputId: this.inputId,
      isRequired: this.isRequired,
      options: this.options
    };
  },

  showError(message) {
    // this.getUI('error').text(message);
  },

  clearError() {
    // this.getUI('error').text('');
  },

  getValue() {
    const value = $(`#${this.inputId}`).val();
    return value;
  }
});
