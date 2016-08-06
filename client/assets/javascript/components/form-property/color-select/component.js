import Marionette from 'backbone.marionette';
import _ from 'underscore';
import $ from 'jquery';

import template from './template.hbs';

import colorsEnum from 'enum/colors';

export default Marionette.View.extend({
  tagName: 'div',

  className: 'color-select',

  initialize(args) {
    this.inputId = _.uniqueId();
    this.name = args.name;
    this.value = args.value || '1';

    this.colors = _.pairs(colorsEnum).map((colorArray) => {
      return {
        id: colorArray[0],
        hexValue: colorArray[1].hexColor,
        isSelected: colorArray[0] === this.value
      };
    });
  },

  template,

  templateContext() {
    return {
      label: this.name,
      value: this.value,
      inputId: this.inputId,
      colors: this.colors
    };
  },

  getValue() {
    const value = $(`.js-color-select-${this.inputId}:checked`).val();
    return value;
  }
});
