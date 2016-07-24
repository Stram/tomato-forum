import InputTextView from 'components/form-property/input-text/component';
import SwitchView from 'components/form-property/switch/component';

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
    default:
      console.warn('unknown form property type');
      return null;
    }
  }
};
