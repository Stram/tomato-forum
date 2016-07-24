import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

// templates
import template from './template.html';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'input-box',

  initialize(args) {
    this.name = args.name;
    this.value = args.value;
    this.inputId = _.uniqueId();
    this.isRequired = args.required;
  },

  template,

  render() {
    this.$el.html(
      _.template(
        this.template({
          label: this.name,
          value: this.value,
          inputId: this.inputId,
          isRequired: this.isRequired
        })
      )
    );

    return this;
  },

  close() {
    this.remove();
  },

  getValue() {
    const value = $(`#${this.inputId}`).val();
    return value;
  }
});
