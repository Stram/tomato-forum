import Marionette from 'backbone.marionette';

import InputTextView from 'components/form-property/input-text/component';
import SwitchView from 'components/form-property/switch/component';
import ColorSelectView from 'components/form-property/color-select/component';


export default Marionette.CollectionView.extend({
  tagName: 'form',

  className: '',

  events: {
    submit: 'onSubmit'
  },

  childView(item) {
    switch (item.get('type')) {
    case 'text':
      return InputTextView;
    case 'switch':
      return SwitchView;
    case 'color-select':
      return ColorSelectView;
    default:
      throw new Error('unknown form property type');
    }
  },

  childViewOptions(model) {
    return model.toJSON();
  },

  onSubmit(event) {
    event.preventDefault();
    this.trigger('submit');
  }
});
