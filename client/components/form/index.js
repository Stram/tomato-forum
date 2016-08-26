import Marionette from 'backbone.marionette';
import _ from 'underscore';

import InputTextView from 'components/form-property/input-text';
import SwitchView from 'components/form-property/switch';
import MultipleView from 'components/form-property/multiple';
import TextareaView from 'components/form-property/textarea';

import template from './template.hbs';

export default Marionette.View.extend({
  template,
  tagName: 'form',

  className: '',

  events: {
    submit: 'onSubmit'
  },

  initialize(args) {
    this.properties = _.mapObject(args.formProperties, (property) => {
      property.id = _.uniqueId();
      property.View = this.createView(property);
      return property;
    });
    this.addPropertyRegions();
  },

  templateContext() {
    return {
      properties: this.properties
    };
  },

  onRender() {
    const self = this;
    _.values(this.properties).forEach((property) => {
      const view = new property.View(property.options);

      view.on('submit', () => {
        self.trigger('submit');
      });

      self.showChildView(property.id, view);
    });
  },

  createView(property) {
    switch (property.type) {
    case 'text':
      return InputTextView;
    case 'switch':
      return SwitchView;
    case 'multiple':
      return MultipleView;
    case 'textarea':
      return TextareaView;
    default:
      throw new Error('unknown form property type');
    }
  },

  addPropertyRegions() {
    _.values(this.properties).forEach((property) => {
      this.addRegion(property.id, `#${property.id}`);
    });
  },

  getValues() {
    return _.values(this.properties).reduce((values, property) => {
      values[property.name] = this.getChildView(property.id).getValue();
      return values;
    }, {});
  },

  clearErrors() {
    _.values(this.properties).forEach((property) => {
      this.getChildView(property.id).clearError();
    });
  },

  showErrors(errors) {
    this.clearErrors();
    const errorsList = _.isArray(errors) ? errors : [errors];

    errorsList.forEach((error) => {
      const field = error.field;

      if (field && this.properties[field]) {
        const view = this.getChildView(this.properties[field].id);
        view.showError(error.message);
      }
    });
  },

  onSubmit(event) {
    event.preventDefault();
    this.trigger('submit');
  }
});
