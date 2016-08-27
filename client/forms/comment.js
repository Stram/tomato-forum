import BaseForm from 'forms/base-form';
import textareaInputStyle from 'components/form-property/textarea/style.scss';

export default class CategoryForm extends BaseForm {
  constructor() {
    super(...arguments);

    this.properties = {
      content: {
        name: 'content',
        type: 'textarea',
        options: {
          required: true,
          label: false,
          theme: textareaInputStyle.comment
        }
      }
    };
  }
}
