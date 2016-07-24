import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import template from './template.html';

import colorsEnum from 'enum/colors';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'color-select',

  initialize(args) {
    this.inputId = _.uniqueId();
    this.name = args.name;
    this.value = args.value || '1';

    this.colors = _.pairs(colorsEnum).map((colorArray) => {
      return {
        id: colorArray[0],
        hexValue: colorArray[1].hexColor
      };
    });
  },

  template,

  render() {
    this.$el.html(
      _.template(
        this.template({
          label: this.name,
          value: this.value,
          inputId: this.inputId,
          colors: this.colors
        })
      )
    );

    return this;
  },

  close() {
    this.remove();
  },

  getValue() {
    const value = $(`.js-color-select-${this.inputId}:checked`).val();
    return value;
  }
});
