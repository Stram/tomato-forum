import Marionette from 'backbone.marionette';

import InputTextView from 'components/form-property/input-text/component';
import SwitchView from 'components/form-property/switch/component';
import TrixView from 'components/form-property/trix/component';
import ColorSelectView from 'components/form-property/color-select/component';


export default Marionette.CollectionView.extend({
  childView(item) {
    switch (item.type) {
    case 'text':
      return new InputTextView({
        name: item.name,
        value: item.value,
        required: item.required
      });
    case 'switch':
      return new SwitchView({
        name: item.name,
        value: item.value
      });
    case 'trix':
      return new TrixView({
        name: item.name,
        value: item.value
      });
    case 'color-select':
      return new ColorSelectView({
        name: item.name,
        value: item.value
      });
    default:
      throw new Error('unknown form property type');
    }
  }
});
