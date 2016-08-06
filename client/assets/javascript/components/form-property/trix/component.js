import Marionette from 'backbone.marionette';
import _ from 'underscore';
import $ from 'jquery';

import template from './template.hbs';

export default Marionette.View.extend({
  tagName: 'div',

  className: 'trix-container',

  initialize(args) {
    this.name = args.name;
    this.inputId = _.uniqueId();
  },

  template,

  templateContext() {
    return {
      inputId: this.inputId
    };
  },

  getValue() {
    const value = $(`#${this.inputId}`).val();
    return value;
  }
});
