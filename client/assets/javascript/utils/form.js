import InputTextView from 'components/form-property/input-text/component';
import SwitchView from 'components/form-property/switch/component';
import TrixView from 'components/form-property/trix/component';
import ColorSelectView from 'components/form-property/color-select/component';

export default {
  createFormPropertyObject(propertyName, propertyOptions) {
    switch (propertyOptions.type) {
    case 'text':
      return new InputTextView({
        name: propertyName,
        value: propertyOptions.value,
        required: propertyOptions.required
      });
    case 'switch':
      return new SwitchView({
        name: propertyName,
        value: propertyOptions.value
      });
    case 'trix':
      return new TrixView({
        name: propertyName,
        value: propertyOptions.value
      });
    case 'color-select':
      return new ColorSelectView({
        name: propertyName,
        value: propertyOptions.value
      });
    default:
      throw new Error('unknown form property type');
    }
  }
};
