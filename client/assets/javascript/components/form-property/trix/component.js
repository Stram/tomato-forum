import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

// templates
import template from './template.html';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'trix-container',

  initialize(args) {
    this.name = args.name;
    this.inputId = _.uniqueId();
  },

  template,

  render() {
    this.$el.html(
      _.template(
        this.template({
          inputId: this.inputId
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
