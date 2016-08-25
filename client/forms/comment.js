import BaseForm from 'forms/base-form';

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
          submit: {
            label: 'Submit'
          }
        }
      }
    };
  }
}
