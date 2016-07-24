import BaseForm from 'forms/base-form';

export default class CategoryForm extends BaseForm {
  constructor() {
    super(...arguments);
    this.modelName = 'category';

    this.properties = {
      name: {
        type: 'text'
      },

      allowNewThreads: {
        type: 'switch'
      },

      color: {
        type: 'color-select'
      }
    };
  }

}
